package com.scan_n_eat.recipe_service.repository;

import com.scan_n_eat.recipe_service.entity.SavedRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SavedRecipeRepository extends JpaRepository<SavedRecipe, Long> {

    List<SavedRecipe> findByUserId(Long userId);

    Optional<SavedRecipe> findByUserIdAndRecipeId(Long userId, UUID recipeId);

    boolean existsByUserIdAndRecipeId(Long userId, UUID recipeId);

    void deleteByUserIdAndRecipeId(Long userId, UUID recipeId);

    // For trending: count saves per recipe in a time period
    @Query("SELECT sr.recipe.id, COUNT(sr) as saveCount " +
           "FROM SavedRecipe sr " +
           "WHERE sr.savedAt > :after " +
           "GROUP BY sr.recipe.id " +
           "ORDER BY saveCount DESC")
    List<Object[]> findMostSavedRecipesSince(@Param("after") LocalDateTime after);
}
