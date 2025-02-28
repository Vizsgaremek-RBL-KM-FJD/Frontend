import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = async (route, state) => {
  const userID = JSON.parse(localStorage.getItem('loggedUser')!).ID;
  const url = `http://127.0.0.1:3000/users/isAdmin/${userID}`;

  const response = await fetch(url);
  const isAdmin = await response.json();

  return isAdmin;
};