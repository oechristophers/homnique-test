
export default function handler(req, res) {
    if (req.method === "POST") {
      const { email, password } = req.body;
  
      // Dummy user credentials
      const dummyUser = {
        email: "daramola@homnique.com",
        password: "Password123#",
      };
  
      // Check if the email and password match the dummy user
      if (email === dummyUser.email && password === dummyUser.password) {
        // Simulate successful authentication
        return res.status(200).json({ message: "Authentication successful", authenticated: true });
      } else {
        // Authentication failed
        return res.status(401).json({ message: "Invalid email or password", authenticated: false });
      }
    } else {
      // Method not allowed
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
  