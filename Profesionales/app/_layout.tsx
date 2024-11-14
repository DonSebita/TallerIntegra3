// import { AuthProvider, useAuth } from '@/components/services/authProvider';
// import { Slot, useRouter } from 'expo-router';
// import { useEffect } from 'react';

// function AuthRedirect() {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.replace('/auth');
//     } else {
//       router.replace('/home');
//     }
//   }, [isAuthenticated, router]);

//   return <Slot />;
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//         <AuthRedirect />
//     </AuthProvider>
//   );
// }


import { AuthProvider, useAuth } from '@/components/services/authProvider';
import { Slot, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='auth/login'/>
      <Stack.Screen name='home'/>
    </Stack>
  );
}