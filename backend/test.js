const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://smvtndylicskgoqwwpjj.supabase.co',
  'sb_publishable_B7G9ce71LQIgM3IoHbYo7Q_1gB_Moi1'
)

const run = async () => {
  /* Sign in with a test account — create one first if needed */
  const { data, error } = await supabase.auth.signInWithPassword({
    email:    'test@example.com',
    password: 'Test1234!',
  })

  if (error) {
    console.error('❌ Auth error:', error.message)
    console.log('\n👉 Create this user first at https://supabase.com/dashboard/project/smvtndylicskgoqwwpjj/auth/users')
    return
  }

  console.log('✅ Signed in!')
  console.log('📋 Copy this token:\n')
  console.log(data.session.access_token)
  console.log('\n')
}

run()