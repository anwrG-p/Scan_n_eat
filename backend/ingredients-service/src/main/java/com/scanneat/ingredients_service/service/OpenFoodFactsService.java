package com.scanneat.ingredients_service.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpenFoodFactsService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Open Food Facts Search API
    // https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&search_simple=1&action=process&json=1
    private static final String SEARCH_URL = "https://world.openfoodfacts.org/cgi/search.pl?search_terms=%s&search_simple=1&action=process&json=1&page_size=1";

    public Optional<IngredientInfo> fetchIngredientInfo(String name) {
        try {
            String url = String.format(SEARCH_URL, name.replace(" ", "+"));
            log.info("Fetching info for: {} from {}", name, url);
            
            // Allow basic error handling
            JsonNode root = restTemplate.getForObject(url, JsonNode.class);

            if (root != null && root.has("products") && root.get("products").isArray() && root.get("products").size() > 0) {
                JsonNode product = root.get("products").get(0);
                
                String id = product.has("code") ? product.get("code").asText() : null;
                
                // Get Calories (Energy - kcal)
                Double calories = 0.0;
                if (product.has("nutriments") && product.get("nutriments").has("energy-kcal_100g")) {
                    calories = product.get("nutriments").get("energy-kcal_100g").asDouble();
                }

                // Estimate Price: Open Food Facts doesn't have reliable price data.
                Double estimatedPrice = calculateEstimatedPrice(name, calories);

                return Optional.of(new IngredientInfo(id, calories, estimatedPrice));
            }
        } catch (Exception e) {
            log.error("Failed to fetch data from OFF for {}: {}", name, e.getMessage());
            // Return empty to allow fallback logic to proceed
            return Optional.empty(); 
        }
        return Optional.empty();
    }

    private Double calculateEstimatedPrice(String name, Double calories) {
        // Deterministic price based on name hash to ensure it stays same across reloads
        int hash = Math.abs(name.hashCode()); 
        // Base price $0.50 + up to $5.00 extra
        double price = 0.50 + (hash % 500) / 100.0;
        // Higher calorie items (often denser/processed) might be slightly more expensive formulaically? 
        // Just keeping it simple deterministically.
        return Math.round(price * 100.0) / 100.0;
    }

    public record IngredientInfo(String externalId, Double calories, Double averagePrice) {}
}
