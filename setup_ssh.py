import paramiko
import os

host = '82.29.175.72'
port = 22
username = 'root'
password = 'Yarvo@2026os'

pub_key_path = os.path.expanduser('~/.ssh/id_ed25519.pub')
with open(pub_key_path, 'r') as f:
    pub_key = f.read().strip()

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    print(f"Connecting to {host}...")
    client.connect(host, port, username, password)
    
    # Create .ssh directory if it doesn't exist
    stdin, stdout, stderr = client.exec_command('mkdir -p ~/.ssh && chmod 700 ~/.ssh')
    stdout.channel.recv_exit_status()
    
    # Add key to authorized_keys
    cmd = f'echo "{pub_key}" >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'
    stdin, stdout, stderr = client.exec_command(cmd)
    exit_status = stdout.channel.recv_exit_status()
    
    if exit_status == 0:
        print("Successfully added public key to authorized_keys.")
    else:
        print("Failed to add public key.")
        print("stderr:", stderr.read().decode())
        
except Exception as e:
    print(f"Error: {e}")
finally:
    client.close()
