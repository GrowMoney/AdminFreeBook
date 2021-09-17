import React, { useState } from "react";
import { Layout } from "antd";
import TopicMenu from "./component/menu";

import "./App.css";

import NavBar from "./component/navbar";
import SideBar from "./component/sidebar";
import Booklist from "./pages/booklist"

function App() {
  const topics = ["Book List", "Fitur 2", "Fitur 3"];
  const content = [<Booklist/> ,"1" ,"2"]
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };
  const Menu = (
    <TopicMenu
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );
  return (
    <div className="App">
      <NavBar menu={Menu} />
      <Layout>
        <SideBar menu={Menu} />
        <Layout.Content className="content">
          {content[contentIndex]}
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;