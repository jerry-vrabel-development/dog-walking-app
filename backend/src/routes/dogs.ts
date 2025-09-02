import { Router, Request, Response } from 'express';
import { Dog } from '../models/Dog';
import { authenticateToken } from '../middleware/auth';
import { CreateDogRequest, ApiResponse } from '@dog-walking-app/shared';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get all dogs for the authenticated user (or all dogs if admin)
router.get('/', async (req: Request, res: Response) => {
  try {
    let query: any = { isActive: true };
    
    // If user is admin and requesting all dogs via query parameter
    if (req.user.role === 'admin' && req.query.all === 'true') {
      // Return all dogs (keep only isActive filter)
      query = { isActive: true };
    } else {
      // Regular users only see their own dogs
      query = { ownerId: req.user._id, isActive: true };
    }
    
    const dogs = await Dog.find(query).populate('ownerId', 'name email'); // Optionally populate owner info for admin view
    
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
    
    // Build query based on user role
    let findQuery: any = { _id: id };
    
    // If not admin, restrict to user's own dogs
    if (req.user.role !== 'admin') {
      findQuery.ownerId = req.user._id;
    }
    
    const dog = await Dog.findOneAndUpdate(
      findQuery,
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
    
    // Build query based on user role
    let findQuery: any = { _id: id };
    
    // If not admin, restrict to user's own dogs
    if (req.user.role !== 'admin') {
      findQuery.ownerId = req.user._id;
    }

    const dog = await Dog.findOneAndUpdate(
      findQuery,
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

// Get all dogs for the authenticated user (or all dogs if admin)
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('=== DOG ROUTE DEBUG ===');
    console.log('User:', req.user);
    console.log('User role:', req.user.role);
    console.log('Query params:', req.query);
    console.log('Query all:', req.query.all);
    console.log('Is admin?', req.user.role === 'admin');
    console.log('All param is true?', req.query.all === 'true');
    console.log('Both conditions?', req.user.role === 'admin' && req.query.all === 'true');
    
    let query: any = { isActive: true };
    
    // If user is admin and requesting all dogs via query parameter
    if (req.user.role === 'admin' && req.query.all === 'true') {
      console.log('✅ ADMIN VIEW: Fetching ALL dogs');
      query = { isActive: true };
    } else {
      console.log('👤 USER VIEW: Fetching user\'s dogs only');
      query = { ownerId: req.user._id, isActive: true };
    }
    
    console.log('Final query:', query);
    
    const dogs = await Dog.find(query);
    
    console.log('Found dogs count:', dogs.length);
    console.log('Dogs:', dogs.map(d => ({ name: d.name, ownerId: d.ownerId })));
    console.log('=== END DEBUG ===');
    
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

export default router;
