# 🍔 FoodDelivery - Plateforme de Livraison & Réservation (PFE)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **Projet de Fin d'Études (PFE)** réalisé par une équipe de 3 développeurs.
> Une solution complète type "Glovo" permettant la commande de repas, la gestion de flotte de livreurs et la réservation de tables en restaurant.

## 📱 Aperçu du Projet

Ce projet est une application web Full Stack composée d'une **API REST Laravel** robuste et d'un frontend dynamique en **React.js**. Elle gère quatre types d'utilisateurs avec des interfaces dédiées :
1.  **Clients :** Commandes, suivi en temps réel, réservation de tables.
2.  **Restaurateurs (Partenaires) :** Gestion des menus, des commandes et de la salle.
3.  **Livreurs (Riders) :** Acceptation des livraisons, changement de statut.
4.  **Admin :** Validation des inscriptions (Restos/Livreurs), statistiques globales.

---

## ✨ Fonctionnalités Clés

Basé sur notre architecture API (`api.php`), voici les modules principaux :

### 🛍️ Pour les Clients
* **Navigation & Recherche :** Filtrage par catégories, restaurants populaires ou "Trending".
* **Système de Commande :** Panier dynamique, passage de commande.
* **Réservation de Table :** Visualisation des zones (`SeatingArea`) et réservation de créneaux.
* **Avis & Notes :** Système de reviews après commande.

### 👨‍🍳 Pour les Restaurants
* **Gestion du Menu :** Ajout/Modification de plats et catégories.
* **Tableau de Bord :** Vue des commandes entrantes (Pending, Approved).
* **Gestion de Salle :** Configuration des tables et des zones pour les réservations.
* **Analytics :** Rapports sur les menus les plus commandés et revenus.

### 🛵 Pour les Livreurs
* **Inscription & Validation :** Processus d'approbation par l'admin.
* **Gestion des courses :** Assignation des commandes (`assignToRider`), mise à jour des status (Livré/En cours).
* **Profil :** Suivi de l'activité journalière (`today-summary`).

### 🛡️ Admin & Sécurité
* **Authentification :** Système sécurisé via **Laravel Sanctum**.
* **Modération :** Approbation des nouveaux restaurants et livreurs.
* **Statistiques :** Vue globale sur l'activité de la plateforme.

---

## 🛠️ Stack Technique

### Frontend (Client)
* **Framework :** React.js (Create React App / Vite)
* **Routing :** React Router DOM v6
* **HTTP Client :** Axios
* **State Management :** Context API / Redux (à préciser selon votre choix)

### Backend (API)
* **Framework :** Laravel 10/11
* **Auth :** Laravel Sanctum
* **Database :** MySQL (Géré via PHPMyAdmin)
* **API Resources :** Pour le formatage JSON standardisé.

---

## 🚀 Installation & Démarrage

Ce projet nécessite deux terminaux (un pour Laravel, un pour React).

### Prérequis
* PHP >= 8.1 & Composer
* Node.js & NPM
* Serveur MySQL (XAMPP/WAMP/Laragon)

### 1. Configuration du Backend (Laravel)
```bash
# Aller dans le dossier serveur
cd backend

# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# ⚠️ Configurez votre base de données dans le fichier .env (DB_DATABASE, DB_USERNAME, etc.)

# Migrer la base de données
php artisan migrate --seed 
# Lancer le serveur API
php artisan serve
```
### 2. Configuration du Frontend (React)
```
# Aller dans le dossier client
cd frontend

# Installer les dépendances JS
npm install

# Lancer l'application React
npm start
```
### 👥 L'Équipe (Dev Team)
## 👥 L'Équipe (Dev Team)

Projet réalisé avec ❤️ par :

| Membre | Rôle Principal | Liens |
| :--- | :--- | :--- |
| **Youssef Barakat** | Full Stack Dev (Orders, Riders, Menus) | [GitHub](https://github.com/) |
| **Abdellatif Ouhsaine** | Full Stack Dev (Restaurants, Auth) | [GitHub](https://github/Abdellatif-Ouhsaine.com/) |
| **Mouad Nourssedate** | Full Stack Dev (Reservations, Frontend UI) | |
