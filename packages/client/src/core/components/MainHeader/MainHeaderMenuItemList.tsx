import React, { FC, useState, useRef, useEffect, KeyboardEvent, SyntheticEvent } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Menu from '@material-ui/icons/Menu';
import { HeaderMenu } from './MainHeader.styled';
import { KnownComponentsStr,  KnownComponents } from '../types/Components';

export interface MainHeaderMenuItemListProps {

    visibleWidgets?: {[key in KnownComponentsStr]: boolean};
    addWidget?(name: string): void;
  }
  

const MainHeaderMenuItemList : FC<MainHeaderMenuItemListProps> = (props) => {    
  const { visibleWidgets, addWidget } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | SyntheticEvent, name: string) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
        addWidget && addWidget(name);
    }

    setOpen(false);
  };

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const widgets = visibleWidgets || {market: false, trades: false, book: false, candle: false};

  return (
      <HeaderMenu ref={anchorRef}>
        <Menu 
          id="composition-button"  
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{verticalAlign: 'middle'}} />
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          style={{zIndex: 99}} 
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={(el) => handleClose(el, '')} >
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={(el) => handleClose(el, 'market')} disabled={widgets['market']}>{KnownComponents['market']}</MenuItem>
                    <MenuItem onClick={(el) => handleClose(el, 'trades')} disabled={widgets['trades']}>{KnownComponents['trades']}</MenuItem>
                    <MenuItem onClick={(el) => handleClose(el, 'candle')} disabled={widgets['candle']}>{KnownComponents['candle']}</MenuItem>
                    <MenuItem onClick={(el) => handleClose(el, 'book')} disabled={widgets['book']}>{KnownComponents['book']}</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </HeaderMenu>
  );
}

export default MainHeaderMenuItemList;
