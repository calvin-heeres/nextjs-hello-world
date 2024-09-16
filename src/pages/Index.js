// Import necessary modules
import express from 'express';
import Client from 'ssh2-sftp-client';
import Link from "next/link";

export default function Home() {
  // Create an express app
const app = express();
const port = 3000;

// Initialize the SFTP client
const sftp = new Client();

// Define a route to handle the SFTP connection
app.get('/', async (req, res) => {
  try {
    // Connect to the SFTP server
    await sftp.connect({
      host: 'test.rebex.net', // SFTP server host
      port: 22,          // SFTP server port, usually 22 for SFTP
      username: 'demo', // SFTP username
      password: 'password', // SFTP password
    });

    // List the files in the specified directory
    const data = await sftp.list('/pub/example');
    console.log(data, 'the data info'); // Log data to console

    // Check if a specific file exists and download it
    if (data.some(file => file.name === 'readme.txt')) {
      await sftp.get('/pub/example/readme.txt', '/home/betty/scratch/hello.txt');
      console.log('File downloaded successfully');
    } else {
      console.log('File not found');
    }

    // Send a success response after all operations are complete
    res.send('SFTP operations completed successfully');

    // Close the connection
    await sftp.end();
  } catch (err) {
    // Handle any errors during the SFTP connection
    console.error(err, 'catch error');
    res.status(500).send('Error during SFTP operation');
  }
});

  return (
    <div>
      Hello World.{" "}
      <Link href="/about">
        About
      </Link>
    </div>
  );
}




