const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const superadminRoutes = require('./Routes/superadmin-route');
const userRoutes = require('./Routes/user-route');
const productRoutes = require('./Routes/product-route');
const aboutusRoutes = require('./Routes/aboutus-route');
const sectionContentRoutes = require('./Routes/sectionContent-route');
const settingsRoutes = require('./Routes/settings-route');
const serviceRoutes = require('./Routes/service-route');
const contactInformationRoutes = require('./Routes/contactInformation-route');
const abonnementRoutes = require('./Routes/abonnementRoutes');
const factureRoutes = require('./Routes/factureRoute');
const questionRoute = require('./Routes/questionRoute');
const notificationRoute = require('./Routes/notificationRoutes');
const nouvquestionRoute = require('./Routes/nouvquestionRoute');


app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.use(express.json());


// app.use('/icons', express.static(path.join(__dirname, 'uploads/icons')));
app.use('/', express.static(path.join(__dirname, 'uploads/')));
app.use('/questions', questionRoute);
app.use('/factures', factureRoutes);
app.use('/abonnements', abonnementRoutes);
app.use('/superadmins', superadminRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/aboutus', aboutusRoutes);
app.use('/contactInformation', contactInformationRoutes);
app.use('/sectionContent', sectionContentRoutes);
app.use('/settings', settingsRoutes);
app.use('/service', serviceRoutes);
app.use('/notifications', notificationRoute);
app.use('/nouvquestion', nouvquestionRoute);

app.use('/uploads', express.static('uploads'));


app.get('/api/getListIcons', (req, res) => {
  const iconsDirectory = path.join(__dirname, 'uploads/icons');

  fs.readdir(iconsDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading icons directory' });
    }

    // Filter for icon files (assuming common icon formats)
    const iconFiles = files.filter(file => ['.png', '.jpg', '.jpeg', '.svg'].includes(path.extname(file)));

    res.json({
      icons: iconFiles.map(file => `/icons/${file}`),  // Send the public URL for each icon
    });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
