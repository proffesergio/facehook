<div align="center">

# 📘 Facehook

**A Production-Grade Social Network UI & Admin Control Sandbox Built with Next.js 15 & Tailwind CSS**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3%2Fv4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

*An educational playground for prototyping, component design, state management, and End-to-End (E2E) UI testing.*

[Explore Features](#-key-features) • [Quick Start](#-quick-start) • [Admin System](#-admin-control-subsystem) • [Educational Use Cases](#-educational-use-cases) • [Contributing](#-contributing)

---

</div>

## 🌟 Overview

**Facehook** is a full-featured, responsive Facebook UI clone and administrative testing ground engineered with **Next.js App Router** and **Tailwind CSS**. Designed specifically as a real-world reference implementation, this project demonstrates how to structure complex, multi-layout web applications containing both consumer-facing social feeds and protected administrative control panels.

Whether you are learning modern Next.js 15 patterns, practicing End-to-End (E2E) testing with Playwright or Cypress, or building your own full-stack social platform, Facehook serves as the ideal launchpad.

---

## ✨ Key Features

### 📱 Authentic Social Feed & Auth Flow
* **Realistic Login Page**: Authenticate into the app using a pixel-perfect Facebook login layout complete with regional footers and dynamic view transitions.
* **Interactive Feed & Reactions**: Create posts, toggle likes in real-time, view attachments, and interact with post metadata.
* **Stories & Navigation**: Fully responsive story carousel, top navigation header, sidebars, and mobile-first layout optimizations.

### 🛡️ Admin Control Subsystem (`/admin` & `/admin/users`)
* **Environment Credential Injection**: Automatically inject default system administrator accounts using `.env.local` variables.
* **Credentials Directory**: Inspect user account credentials with toggleable password visibility (`••••••••` to plain-text).
* **Full CRUD & Status Management**: Create, edit, suspend, or delete users dynamically with instant UI state updates.
* **Platform Feature Toggles**: Control global feature switches (Marketplace, User Registrations, Maintenance Mode) on the fly.
* **Data Export**: One-click CSV export utility for user directories.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15** | App Router, Server/Client Component Architecture |
| **Language** | **TypeScript** | Strict type safety across posts, users, and admin state |
| **Styling** | **Tailwind CSS** | Utility-first responsive styling with custom color tokens |
| **Icons** | **Lucide React** | Modern, lightweight icon suite |
| **Environment** | **Next.js Dotenv** | Public environment variable injection (`NEXT_PUBLIC_*`) |

---

## 🚀 Quick Start

Follow these simple steps to get Facehook running locally in under 2 minutes:

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/facehook.git](https://github.com/proffesergio/facehook.git)
cd facehook