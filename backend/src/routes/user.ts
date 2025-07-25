import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { authenticateToken } from '../middleware/auth';
import { requireAdmin, requireAdminOrSelf } from '../middleware/admin';
import { ApiResponse } from '@dog-walking-app/shared';
import bcrypt from 'bcryptjs';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get all users (admin only)
router.get('/', requireAdmin, async (req: Request, res: Response) => {
  try {
    // Only return basic user info, exclude password
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: users,
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve users'
    });
  }
});

// Get a specific user by ID (admin or the user themselves)
router.get('/:id', requireAdminOrSelf, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, '-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user,
      message: 'User retrieved successfully'
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve user'
    });
  }
});

// Create a new user (admin only)
router.post('/', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, email, role, phone, address } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists'
      });
    }
    
    // Generate a temporary password (in a real app, you might send this via email)
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || 'owner',
      phone,
      address,
      createdAt: new Date()
    };
    
    const user = new User(userData);
    await user.save();
    
    // Return user without password, but include temp password in response for demo
    const { password, ...userWithoutPassword } = user.toObject();
    
    res.status(201).json({
      success: true,
      data: {
        ...userWithoutPassword,
        tempPassword // In production, send this via email instead
      },
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

// Update a user (admin or the user themselves)
router.put('/:id', requireAdminOrSelf, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, role, ...updateData } = req.body;
    
    // Only admins can change roles
    if (role && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Only admins can change user roles'
      });
    }
    
    const finalUpdateData = { ...updateData };
    
    // If role is being updated and user is admin, include it
    if (role && req.user.role === 'admin') {
      finalUpdateData.role = role;
    }
    
    // If password is being updated, hash it
    if (password) {
      finalUpdateData.password = await bcrypt.hash(password, 10);
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      { ...finalUpdateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user'
    });
  }
});

// Delete a user (admin only)
router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Don't allow admins to delete themselves
    if (id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete your own account'
      });
    }
    
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: null,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user'
    });
  }
});

// Get all walkers (public endpoint for owners to browse)
router.get('/walkers/available', async (req: Request, res: Response) => {
  try {
    const walkers = await User.find(
      { role: 'walker' },
      '-password'
    ).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: walkers,
      message: 'Available walkers retrieved successfully'
    });
  } catch (error) {
    console.error('Get walkers error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve walkers'
    });
  }
});

export default router;
