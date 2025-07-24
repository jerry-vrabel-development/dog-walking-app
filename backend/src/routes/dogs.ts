import { Router, Request, Response } from 'express';
import { Dog } from '../models/Dog';
import { authenticateToken } from '../middleware/auth';
import { CreateDogRequest, ApiResponse } from '@dog-walking-app/shared';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get all dogs for the authenticated user
router.get('/', async (req: Request, res: Response) => {
  try {
    const dogs = await Dog.find({ ownerId: req.user._id, isActive: true });
    res.json({
      success: true,
      data: dogs,
      message: 'Dogs retrieved successfully'
    });
  } catch (error) {
    console.error('Get dogs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve dogs'
    });
  }
});

// Create a new dog
router.post('/', async (req: Request<{}, ApiResponse<any>, CreateDogRequest>, res: Response) => {
  try {
    const dogData = {
      ...req.body,
      ownerId: req.user._id.toString(),
      isActive: true
    };

    const dog = new Dog(dogData);
    await dog.save();

    res.status(201).json({
      success: true,
      data: dog,
      message: 'Dog created successfully'
    });
  } catch (error) {
    console.error('Create dog error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create dog'
    });
  }
});

// Update a dog
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dog = await Dog.findOneAndUpdate(
      { _id: id, ownerId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!dog) {
      return res.status(404).json({
        success: false,
        error: 'Dog not found'
      });
    }

    res.json({
      success: true,
      data: dog,
      message: 'Dog updated successfully'
    });
  } catch (error) {
    console.error('Update dog error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update dog'
    });
  }
});

// Delete a dog (soft delete)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dog = await Dog.findOneAndUpdate(
      { _id: id, ownerId: req.user._id },
      { isActive: false },
      { new: true }
    );

    if (!dog) {
      return res.status(404).json({
        success: false,
        error: 'Dog not found'
      });
    }

    res.json({
      success: true,
      data: null,
      message: 'Dog deleted successfully'
    });
  } catch (error) {
    console.error('Delete dog error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete dog'
    });
  }
});

export default router;
