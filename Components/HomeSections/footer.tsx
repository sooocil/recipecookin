import React from "react";

const HomeFooter = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 mt-16">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-400">
        <p>
          &copy; {new Date().getFullYear()} RecipeCookin&apos;. All rights
          reserved.
        </p>
        <p>
          Built with ❤️ by{" "}
          <span className="font-medium text-white">sooocil (Sushil Regmi)</span>
        </p>
      </div>
    </footer>
  );
};

export default HomeFooter;
