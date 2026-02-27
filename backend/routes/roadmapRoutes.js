const express = require('express')
const { requireAuth } = require('../middleware/authMiddleware')
const {
  generateRoadmap,
  getRoadmaps,
  getRoadmapById,
  updateProgress,
  deleteRoadmap,
} = require('../controllers/roadmapController')

const router = express.Router()

router.post  ('/generate-roadmap',      requireAuth, generateRoadmap)
router.get   ('/roadmaps',              requireAuth, getRoadmaps)
router.get   ('/roadmaps/:id',          requireAuth, getRoadmapById)
router.patch ('/roadmaps/:id/progress', requireAuth, updateProgress)
router.delete('/roadmaps/:id',          requireAuth, deleteRoadmap)

module.exports = router