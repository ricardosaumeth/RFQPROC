import React, { useEffect, useState, CSSProperties } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'modules/redux/store';
import { AppAction } from 'modules/app/actions';
import { Container, Content } from 'App.styled';
import { VisiblePanel } from 'core/components/Widget/Widget.styled';
import CloseableWidget from 'core/components/Widget/CloseableWidget';
import MainHeader from 'core/components/MainHeader';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'theme/fonts.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridLayout from "react-grid-layout";
import Palette from 'theme/style';
import { KnownComponents, KnownComponentsStr } from 'core/components/types/Components';

function App() {
  const store = configureStore();

  const defaultLayout = [
    { i: "trades", x: 0, y: 0, w: 3, h: 5, isBounded: true },    
    { i: "market", x: 0, y: 5, w: 3, h: 3, isBounded: true },
    { i: "candle", x: 3, y: 0, w: 7, h: 5, isBounded: true },
    { i: "book", x: 3, y: 5, w: 7, h: 3, isBounded: true }
  ];
  const loadedLayout: any[] = getFromLS("layout") || defaultLayout;
  const [savedLayout, setSavedLayout] = useState(loadedLayout);

  const lockedState: boolean = localStorage.getItem("locked") === "true";
  const [isLocked, setIsLocked] = useState(lockedState);

  const layoutChangeHandler = (newLayout: any[]) => {
    saveToLS("layout", newLayout);
  }
  const removeWidgetHandle = (name: string) => {
    const res = savedLayout.filter(obj => obj.i !== name);
    setSavedLayout(res);
  }
  const tradesVisible = savedLayout.findIndex(obj => obj.i === "trades") != -1;
  const marketVisible = savedLayout.findIndex(obj => obj.i === "market") != -1;
  const candleVisible = savedLayout.findIndex(obj => obj.i === "candle") != -1;
  const bookVisible = savedLayout.findIndex(obj => obj.i === "book") != -1;

  const layoutUnlockHandle = (locked: boolean) => {
    setIsLocked(locked);
    localStorage.setItem("locked", String(locked));
  }

  const addWidgetHandle = (name: string) => {
    const newArray = defaultLayout.filter(obj => obj.i === name);
    newArray.push(...savedLayout);
    setSavedLayout(newArray);
  }

  const removeStyle: CSSProperties = {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer",
    color: Palette.Label
  };


  useEffect(() => {
    store.dispatch(AppAction.bootstrapApp());
  }, [isLocked, savedLayout]);

  return (
    <Provider store={store}>
      <Container>
        <Content>
          <MainHeader 
            editLayout={layoutUnlockHandle} 
            isLocked={isLocked} 
            addWidget={addWidgetHandle} 
            visibleWidgets={{ market: marketVisible, trades: tradesVisible, book: bookVisible, candle: candleVisible }} />
          <GridLayout
            className="layout"
            layout={savedLayout}
            cols={20}
            rowHeight={100}
            isDraggable={!isLocked}
            isResizable={!isLocked}
            width={window.innerWidth}
            onLayoutChange={layoutChangeHandler}
            isBounded={true}
            compactType={null}>
            {savedLayout.map(x => 
              <VisiblePanel key={x.i} name={x.i}>
                <CloseableWidget 
                  name={x.i} 
                  title={KnownComponents[x.i as KnownComponentsStr]} 
                  handleClose={isLocked ? undefined : removeWidgetHandle}/>
              </VisiblePanel>
              )
            }
          </GridLayout>
        </Content>
      </Container>
    </Provider>
  );
}

function getFromLS(key: string): any {
  let ls: any = {};
  if (localStorage) {
    try {
      let storedLayout = localStorage.getItem("rgl-7");
      if (storedLayout)
        ls = JSON.parse(storedLayout);
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key: string, value: any) {
  if (localStorage) {
    localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

export default App;
