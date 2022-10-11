import React, { FC } from 'react';
import { Container, LockIcon } from './MainHeader.styled';
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import MainHeaderMenuItemList from './MainHeaderMenuItemList';
import { KnownComponentsStr } from '../types/Components';

export interface MainHeaderProps {
  editLayout?(locked: boolean): void;
  addWidget?(name: string): void;
  isLocked: boolean;
  visibleWidgets?: { [key in KnownComponentsStr]: boolean };
}

const MainHeader: FC<MainHeaderProps> = props => {
  const changeLockedStatus = (el: any) => {
    props.editLayout && props.editLayout(!props.isLocked);
  };

  return (
    <Container>
        <div>
          <span>RFQPROC</span>
          {!props.isLocked && <MainHeaderMenuItemList visibleWidgets={props.visibleWidgets} addWidget={props.addWidget}/>}
        </div>
        <LockIcon onClick={el => changeLockedStatus(el)} title={(props.isLocked ? "Unl" : "L") + "ock window drag and resize"}>
          {props.isLocked ? <Lock/> : <LockOpen/>}
        </LockIcon>
    </Container>
  );
};

export default MainHeader;
