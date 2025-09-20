import React from "react";

const HomeFooter = () => {
  return (
    <div>
      <footer className="bg-zinc-800  text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} RecipeCookin'. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomeFooter;
