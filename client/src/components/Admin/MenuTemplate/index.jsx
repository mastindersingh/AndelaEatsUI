import React from 'react';
import TemplateCard from './TemplateCard';

const MenuTemplate = () => (
  <div id="menu-template">
    <header>
      <div className="menu-header-content">
        <span className="title pull-left">Menu Template</span>
        <div>
          <button id="add-menu" className="button" type="button">
            Create
          </button>
          <button id="add-menu" className="button" type="button">
            Filter
          </button>
          <button id="add-menu" className="button" type="button">
            Copy
          </button>
        </div>
      </div>
    </header>
    <main>
      <TemplateCard />
    </main>
  </div>
);

export default MenuTemplate;
