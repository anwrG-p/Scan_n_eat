package com.scan_n_eat.recipe_service.repository;

import com.scan_n_eat.recipe_service.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByUserIdAndRecipeId(Long userId, UUID recipeId);
    List<Rating> findByRecipeId(UUID recipeId);
}
