import multer from "multer";


// Configure disk storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/temp'); // Files will be saved in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });


/*
// Route for handling single file upload
app.post('/upload-single', upload.single('myFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully: ' + req.file.filename);
});

// Route for handling multiple file uploads
app.post('/upload-multiple', upload.array('myFiles', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }
  res.send('Files uploaded successfully: ' + req.files.map(f => f.filename).join(', '));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

*/