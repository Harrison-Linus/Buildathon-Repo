import supabase from '../config/supabase.js';

// POST /api/auth/login
export const loginUser = async (req, res) => {
  const { identifier, password, role } = req.body;

  try {
    if (!identifier || !password || !role) {
      return res.status(400).json({ success: false, message: 'Please provide role, identifier, and password.' });
    }

    // Default Fallback Accounts for Demo (if DB is disconnected)
    const defaultAccounts = {
      '23CSE001': { id: '11111111-1111-1111-1111-111111111111', name: 'Keerthivasan', role: 'student', password: 'student@123', registerNumber: '23CSE001' },
      '23CSE002': { id: '22222222-2222-2222-2222-222222222222', name: 'Ananya Sharma', role: 'student', password: 'student@123', registerNumber: '23CSE002' },
      'STF001': { id: '33333333-3333-3333-3333-333333333333', name: 'Dr. A. Ramanathan', role: 'teacher', password: 'staff@123', staffId: 'STF001' },
      'ADM001': { id: '44444444-4444-4444-4444-444444444444', name: 'System Administrator', role: 'admin', password: 'admin@123', adminId: 'ADM001' },
    };

    if (supabase) {
      let targetUserId = null;
      let userProfile = null;

      // 1. Verify Identifier in the specific role table
      if (role === 'student') {
        const { data, error } = await supabase.from('students').select('user_id, roll_number, name').eq('roll_number', identifier).single();
        if (error || !data) return res.status(401).json({ success: false, message: 'Invalid Student credentials.' });
        targetUserId = data.user_id;
        userProfile = { registerNumber: data.roll_number, name: data.name };
      } else if (role === 'teacher') {
        const { data, error } = await supabase.from('teachers').select('user_id, staff_id, name').eq('staff_id', identifier).single();
        if (error || !data) return res.status(401).json({ success: false, message: 'Invalid Staff credentials.' });
        targetUserId = data.user_id;
        userProfile = { staffId: data.staff_id, name: data.name };
      } else if (role === 'admin') {
        const { data, error } = await supabase.from('admins').select('user_id, admin_id, name').eq('admin_id', identifier).single();
        if (error || !data) return res.status(401).json({ success: false, message: 'Invalid Admin credentials.' });
        targetUserId = data.user_id;
        userProfile = { adminId: data.admin_id, name: data.name };
      } else {
        return res.status(400).json({ success: false, message: 'Invalid role selected.' });
      }

      // 2. Verify User password and actual role in users table
      const { data: user, error: userError } = await supabase.from('users').select('*').eq('id', targetUserId).single();
      
      if (userError || !user || user.password_hash !== password || user.role !== role) {
        return res.status(401).json({ success: false, message: `Invalid ${role === 'teacher' ? 'Staff' : role.charAt(0).toUpperCase() + role.slice(1)} credentials.` });
      }

      return res.json({
        success: true,
        message: 'Login successful',
        token: `demo-token-${user.id}`,
        user: {
          id: user.id,
          role: user.role,
          ...userProfile
        },
      });
    }

    // Fallback Account check
    const targetAccount = defaultAccounts[identifier];
    if (!targetAccount || targetAccount.role !== role || targetAccount.password !== password) {
       return res.status(401).json({ success: false, message: `Invalid ${role === 'teacher' ? 'Staff' : role.charAt(0).toUpperCase() + role.slice(1)} credentials.` });
    }

    // Remove password before sending
    const { password: _, ...safeUser } = targetAccount;

    return res.json({
      success: true,
      message: 'Login successful',
      token: `demo-token-${safeUser.id}`,
      user: safeUser,
    });

  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ success: false, message: 'Internal server error during authentication.' });
  }
};

// GET /api/auth/me
export const getCurrentUser = async (req, res) => {
  // In a real app, extract token, verify, and fetch from DB.
  // Using fallback for demo purposes if no auth middleware is fully implemented.
  return res.json({
    success: true,
    user: {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Keerthivasan',
      role: 'student',
      registerNumber: '23CSE001'
    },
  });
};
