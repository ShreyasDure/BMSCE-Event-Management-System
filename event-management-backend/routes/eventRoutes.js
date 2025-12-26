const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventRegistrations,
  getRegisteredStudentsForEvent,
  getMyRegistrations,
  cancelRegistration,
  approveRegistration,
  rejectRegistration
} = require('../controllers/eventController');

const router = express.Router();

router.post('/', protect, authorize('organizer'), createEvent);
router.get('/', getAllEvents);
router.get('/my-registrations', protect, authorize('student'), getMyRegistrations);
router.get('/:eventId/registered-students', protect, authorize('student'), getRegisteredStudentsForEvent);
router.get('/:id', getEventById);
router.put('/:id', protect, authorize('organizer'), updateEvent);
router.delete('/:id', protect, authorize('organizer'), deleteEvent);

router.post('/register/:eventId', protect, authorize('student'), registerForEvent);
router.delete('/register/:eventId', protect, authorize('student'), cancelRegistration);
router.get('/registrations/:eventId', protect, authorize('organizer'), getEventRegistrations);
router.put('/registrations/:registrationId/approve', protect, authorize('organizer'), approveRegistration);
router.put('/registrations/:registrationId/reject', protect, authorize('organizer'), rejectRegistration);

module.exports = router;