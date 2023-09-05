import { redirect } from "react-router-dom";

export function login(username) {
  // Implement your authentication logic here, e.g., API calls or checking credentials.
  // If authentication is successful, store user data in localStorage.
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("user", JSON.stringify(username));
  location.reload();
  redirect("/");
}

export function logout() {
  // Log the user out by clearing their data from localStorage.
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
  location.reload();
  redirect("/");
}

export function isLoggedIn() {
  // Check if the user is logged in based on localStorage data.
  return localStorage.getItem("isLoggedIn") === "true";
}

export function getUsername() {
  // Get the username from localStorage.
  return JSON.parse(localStorage.getItem("user"));
}
