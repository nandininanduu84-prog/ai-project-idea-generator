import { body, validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }
  next();
};

export const validateRegister = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('branch').isIn(['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'AI/ML', 'Data Science', 'Other']).withMessage('Invalid branch'),
  body('college').trim().notEmpty().withMessage('College name is required'),
  body('yearOfStudy').isIn(['1st Year', '2nd Year', '3rd Year', '4th Year']).withMessage('Invalid year of study'),
  handleValidationErrors,
];

export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

export const validateGenerateProject = [
  body('branch').notEmpty().withMessage('Branch is required'),
  body('year').notEmpty().withMessage('Year is required'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('interests').isArray().withMessage('Interests must be an array'),
  body('projectType').notEmpty().withMessage('Project type is required'),
  body('difficulty').isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid difficulty level'),
  body('teamSize').isInt({ min: 1, max: 6 }).withMessage('Team size must be 1-6'),
  body('duration').notEmpty().withMessage('Duration is required'),
  body('numberOfIdeas').isInt({ min: 1, max: 10 }).withMessage('Number of ideas must be 1-10'),
  handleValidationErrors,
];

export default handleValidationErrors;
