import "devextreme/dist/css/dx.dark.css";

import { Drawer, List } from "devextreme-react";

import Toolbar, { Item } from "devextreme-react/toolbar";

import "./../index.css";

import { useState, useMemo, useCallback } from "react";
import { Outlet, Link } from "react-router-dom";

const navigation = [
  { id: 1, text: "Inbox", icon: "message", path: "inbox" },
  { id: 2, text: "Sent Mail", icon: "check", path: "sent-mail" },
  { id: 3, text: "Trash", icon: "trash", path: "trash" },
  { id: 4, text: "Spam", icon: "mention", path: "spam" },
];

function Root() {
  const [isOpened, setState] = useState(true);
  const buttonOptions = useMemo(() => {
    return {
      icon: "menu",
      onClick: () => {
        setState(!isOpened);
      },
    };
  }, [isOpened]);

  const itemClick = (e) => {
    console.log(e);
    let linkText = e.itemData.text;
    if (linkText === "Spam") {
      history.pushState(null, null, e.itemData.path);

      window.dispatchEvent(new Event("popstate"));
    }
  };

  const renderItem = useCallback((data) => {
    return (
      <div>
        {data.path !== "spam" && (
          <Link to={data.path}>
            <div className="dx-list-item-icon-container">
              <i
                className={`dx-icon dx-list-item-icon dx-icon-${data.icon}`}
              ></i>
            </div>
            <span>{data.text}</span>
          </Link>
        )}
        {data.path === "spam" && (
          <a>
            <div className="dx-list-item-icon-container">
              <i
                className={`dx-icon dx-list-item-icon dx-icon-${data.icon}`}
              ></i>
            </div>
            <span>{data.text}</span>
          </a>
        )}
      </div>
    );
  }, []);

  const renderContent = () => {
    return (
      <div className="drawer" style={{ width: 150 + "px", height: 100 + "vh" }}>
        <List
          items={navigation}
          width={200}
          selectionMode="single"
          itemRender={renderItem}
          onItemClick={itemClick}
        ></List>
      </div>
    );
  };

  return (
    <div>
      <Toolbar id="toolbar" height={37}>
        <Item widget="dxButton" options={buttonOptions} location="before" />
      </Toolbar>
      <Drawer
        minSize={37}
        height={250}
        render={renderContent}
        opened={isOpened}
        revealMode="expand"
      >
        <div id="view">
          <Outlet />
        </div>
      </Drawer>
    </div>
  );
}

export default Root;
