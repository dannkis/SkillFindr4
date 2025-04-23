'use client';

import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderMenuButton,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from '@carbon/react';

import { Switcher, Notification, UserAvatar } from '@carbon/icons-react';
import Link from 'next/link';

// main navigation bar using carbon design system
const Navbar = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="carbon header component">
        {/* skip link for accessibility */}
        <SkipToContent />

        {/* button to toggle the side navigation */}
        <HeaderMenuButton
          aria-label="open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />

        {/* app name with ibm prefix */}
        <Link href="/" passHref legacyBehavior>
          <HeaderName prefix="IBM">SkillFindr</HeaderName>
        </Link>

        {/* top right global actions */}
        <HeaderGlobalBar>
          {/* notifications icon */}
          <HeaderGlobalAction
            aria-label="notifications"
            tooltipAlignment="center"
            className="action-icons">
            <Notification size={20} />
          </HeaderGlobalAction>

          {/* user avatar icon */}
          <HeaderGlobalAction
            aria-label="user avatar"
            tooltipAlignment="center"
            className="action-icons">
            <UserAvatar size={20} />
          </HeaderGlobalAction>

          {/* app switcher icon */}
          <HeaderGlobalAction aria-label="app switcher" tooltipAlignment="end">
            <Switcher size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    )}
  />
);

export default Navbar;
