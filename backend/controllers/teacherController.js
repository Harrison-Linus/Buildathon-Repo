import supabase from '../config/supabase.js';
import { fallbackTeacherInfo } from '../data/fallbackData.js';

// GET /api/teacher/profile
export const getTeacherProfile = async (req, res) => {
  try {
    if (supabase) {
      const { data: teacher, error } = await supabase.from('teachers').select('*').limit(1).single();
      if (!error && teacher) {
        return res.json({ success: true, source: 'supabase', data: teacher });
      }
    }
    return res.json({ success: true, source: 'fallback', data: fallbackTeacherInfo });
  } catch (err) {
    return res.json({ success: true, source: 'fallback', data: fallbackTeacherInfo });
  }
};
