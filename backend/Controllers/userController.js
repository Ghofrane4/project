const bcrypt = require('bcrypt');
const { User, AboutUs, Settings, ContactInformation, SectionContent, Service, Product } = require('../Models'); 
const { Op } = require('sequelize');

// Fonction pour gérer l'enregistrement de l'utilisateur après avoir cliqué sur le lien
const registerUser = async (req, res) => {
    try {
        const { token, password, fullname, companyName, companyFunctionality, phoneNumber } = req.body;

        if (!token || !password || !fullname) {
            return res.status(400).json({ message: 'Le token, le mot de passe et le nom complet sont requis' });
        }

        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: new Date() } // S'assurer que le token n'est pas expiré
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Token invalide ou expiré' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.fullname = fullname; // Mettre à jour ce champ aussi
        user.companyName = companyName;
        user.companyFunctionality = companyFunctionality;
        user.phoneNumber = phoneNumber;
        user.isActive = true;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: 'Inscription réussie' });
    } catch (error) {
        console.error('Erreur dans registerUser:', error);
        res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
};

// Définir la route pour obtenir tous les admins, triés par date de création (du plus récent au plus ancien)
const getAdmins = async (req, res) => {
    try {
        const admins = await User.findAll({
            where: {
                role: 'admin'
            },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'fullname', 'email', 'isActive', 'role', 'companyName', 'companyFunctionality', 'phoneNumber'] // Inclure les nouveaux champs ici
        });
        
        res.status(200).json(admins);
    } catch (error) {
        console.error('Erreur lors de la récupération des admins:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

// Fonction pour activer un utilisateur
const activateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        user.isActive = 1;
        await user.save();
        res.status(200).json({ message: 'Utilisateur activé' });
    } catch (error) {
        console.error('Erreur lors de l\'activation de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

// Fonction pour désactiver un utilisateur
const deactivateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        user.isActive = 0;
        await user.save();
        res.status(200).json({ message: 'Utilisateur désactivé' });
    } catch (error) {
        console.error('Erreur lors de la désactivation de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

// Fonction pour mettre à jour les informations d'un utilisateur
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, role, companyName, companyFunctionality, phoneNumber } = req.body; // Inclure les nouveaux champs

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        user.fullname = fullname;
        user.email = email;
        user.role = role; // Mettre à jour le rôle
        user.companyName = companyName;
        user.companyFunctionality = companyFunctionality;
        user.phoneNumber = phoneNumber;
        await user.save();

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).json({ message: 'Échec de la mise à jour de l\'utilisateur', error: error.message });
    }
};

// Fonction pour mettre à jour les informations d'un utilisateur
const updatImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        user.image = image;
        await user.save();

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).json({ message: 'Échec de la mise à jour de l\'utilisateur', error: error.message });
    }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        await user.destroy();
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).json({ message: 'Échec de la suppression de l\'utilisateur', error: error.message });
    }
};

// Fonction pour obtenir un administrateur spécifique par ID
const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await User.findByPk(id, {
            attributes: ['id', 'fullname', 'email', 'isActive', 'role', 'companyName', 'companyFunctionality', 'phoneNumber'] // Inclure les champs que vous voulez récupérer
        });

        if (!admin) {
            return res.status(404).json({ message: 'Administrateur non trouvé' });
        }

        res.status(200).json(admin);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'administrateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

const getUserInfo = async (req, res) => {
    try {
        // Assuming you are passing user ID in the request params
        const { id } = req.params;

        const user = await User.findOne({
            where: { id },
            include: [
                {
                    model: AboutUs,
                    as: 'aboutUs'
                },
                {
                    model: Settings,
                    as: 'settings'
                },
                {
                    model: ContactInformation,
                    as: 'contactInformation'
                },
                {
                    model: SectionContent,
                    as: 'sectionContent'
                },
                {
                    model: Service,
                    as: 'services'
                },
                {
                    model: Product,
                    as: 'products'
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user info:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const findUserEmail = async (req, res) => {
    try {
        const { mail } = req.params; // ← correction ici
        const user = await User.findOne({ where: { email: mail } });
        if (user) {
            res.status(200).send(String(user.id));

        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = { 
    registerUser, 
    getAdmins, 
    activateUser, 
    deactivateUser, 
    updateUser, 
    deleteUser, 
    getAdminById,
    getUserInfo,
    updatImage,
    findUserEmail
};
