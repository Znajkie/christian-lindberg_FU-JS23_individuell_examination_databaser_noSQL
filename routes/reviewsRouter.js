const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsControllers');

// POST /reviews: Lägg till en ny recension.
router.post('/', reviewsController.postReview);

// GET /reviews: Hämta en lista med alla recensioner.
router.get('/', reviewsController.getAllReviews);

// GET /reviews/:id: Hämta detaljer för en specifik recension.
router.get('/:id', reviewsController.getReviewById);

// PUT /reviews/:id: Uppdatera en specifik recension.
router.put('/:id', reviewsController.updateReview);

// DELETE /reviews/:id: Ta bort en specifik recension.
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
