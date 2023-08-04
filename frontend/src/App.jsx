import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecipeIndex from "./components/RecipeIndex";
import AboutUs from "./components/AboutUs";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import PublicRoute from "./app/PublicRoute";
import PrivateRoute from "./app/PrivateRoute";
import UserAllRecipes from "./user/UserAllRecipes";
import UserFavorites from "./user/UserFavorites";
import UserMyRecipes from "./user/UserMyRecipes";
import "./App.css";
import AddRecipe from "./user/AddRecipe";
import RecipeContent from "./components/RecipeContent";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/recipe-index' element={<RecipeIndex />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route
          path='/recipe-index/:slug'
          element={<RecipeContent isLandingPage />}
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path='/recipes' element={<UserAllRecipes />} />
        <Route path='/recipes/:slug' element={<RecipeContent />} />
        <Route path='/favorites' element={<UserFavorites />} />
        <Route path='/favorites/:slug' element={<RecipeContent />} />
        <Route path='/my-recipes' element={<UserMyRecipes />} />
        <Route
          path='/my-recipes/:slug'
          element={<RecipeContent isUserRecipe />}
        />
        <Route path='/add-recipe' element={<AddRecipe />} />
      </Route>
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
