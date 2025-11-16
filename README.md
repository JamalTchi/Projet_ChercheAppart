# 🏠 ChercheAppart - Plateforme de Recherche d'Appartement

Application mobile React Native qui connecte les **Clients** cherchant un appartement avec des **Hunters** (chasseurs d'appartements).

## 📱 Description

ChercheAppart permet aux clients de publier leurs critères de recherche d'appartement (ville, budget, type, meublé, date d'emménagement) et aux hunters de consulter ces annonces pour proposer leurs services.

## ✨ Fonctionnalités Implémentées

- 🎯 **Sélection de rôle** : Client ou Hunter
- 📝 **Formulaire Client** : Publication de critères de recherche
- 📋 **Liste des Annonces** : Consultation des demandes par les hunters
- 🔍 **Détail d'Annonce** : Vue détaillée avec coordonnées de contact
- 💾 **Persistance des données** : Backend Supabase avec PostgreSQL
- 🎨 **UI Moderne** : NativeWind (Tailwind CSS) avec blob backgrounds
- 🌐 **Déployé sur Vercel** : Accessible en ligne

## 🛠️ Stack Technique

- **Framework** : React Native + Expo SDK 54
- **UI** : NativeWind v4 (Tailwind CSS pour React Native)
- **Navigation** : React Navigation v7
- **Backend** : Supabase (PostgreSQL + REST API)
- **Déploiement** : Vercel (Web)
- **Language** : TypeScript

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/JamalTchi/Projet_ChercheAppart.git
cd Projet_ChercheAppart

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env à la racine avec :
EXPO_PUBLIC_SUPABASE_URL=votre_url_supabase
EXPO_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon

# Lancer l'application
npx expo start
```

## 🗄️ Structure de la Base de Données

Table `requests` dans Supabase :
- `id` : UUID (clé primaire)
- `city` : TEXT (ville recherchée)
- `budget` : INTEGER (budget en euros)
- `type` : TEXT (studio, T1, T2, etc.)
- `furnished` : BOOLEAN (meublé ou non)
- `move_in_date` : DATE (date d'emménagement souhaitée)
- `description` : TEXT (détails supplémentaires)
- `email` : TEXT (contact du client)
- `created_at` : TIMESTAMP (date de création)

## 🔐 Sécurité

- Row Level Security (RLS) activé sur Supabase
- Policies configurées pour l'accès anonyme (SELECT et INSERT)
- Variables d'environnement sécurisées (non commitées sur Git)

## 🌐 Déploiement

Application déployée sur Vercel : [https://projet-cherche-appart.vercel.app](https://projet-cherche-appart.vercel.app)

## 📱 Prochaines Étapes

- [ ] Build APK Android avec Expo EAS Build
- [ ] Système d'authentification (Supabase Auth)
- [ ] Notifications push pour nouveaux critères
- [ ] Chat entre clients et hunters
- [ ] Profils utilisateurs enrichis

## ⚠️ Avertissement de Sécurité

Ce projet nécessite des variables d'environnement Supabase pour fonctionner. Les clés ne sont **pas incluses** dans ce repository pour des raisons de sécurité.

## 📄 License

**© 2025 Jamal - Tous droits réservés**

Ce code est protégé par copyright. Toute reproduction, distribution ou utilisation commerciale est interdite sans autorisation écrite. Le code est visible à des fins éducatives uniquement.

Voir [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Jamal** - [JamalTchi](https://github.com/JamalTchi)

---

*Ce projet est en développement actif. Non ouvert aux contributions externes.*
