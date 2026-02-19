import { View, Text, Button } from 'react-native';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Index() {
  const [status, setStatus] = useState('Not tested');

  const testConnection = async () => {
    try {
      setStatus('Testing...');
      
      // Try to fetch from profiles table (should be empty but connection should work)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      
      if (error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus(`✅ Connected! Found ${data?.length || 0} profiles`);
      }
    } catch (err) {
      setStatus(`❌ Failed: ${err.message}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Supabase Connection Test
      </Text>
      
      <Text style={{ marginBottom: 20, textAlign: 'center' }}>
        {status}
      </Text>
      
      <Button title="Test Connection" onPress={testConnection} />
    </View>
  );
}