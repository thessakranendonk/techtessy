import React, { Fragment } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { NavigationLink } from '../SimpleHeader/SimpleHeader';
import { IconNavBarProps } from '../../App';
import { ChevronUpIcon, ChevronDownIcon } from '@patternfly/react-icons';
import { HamburgerButton } from '../UI/Buttons/HamburgerButton/HamburgerButton';

export interface IconHeaderProps {
  navigationLinks: NavigationLink[];
  iconNavBarItems?: IconNavBarProps[];
  headerBgColor?: string;
  linkClassName: string;
  hoverClassName: string;
  activeLinkClassName: string;
  currentActiveLocation?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonBorderColor?: string;
  headerTitle?: string;
  logo?: string | undefined;
  logoClassName?: string;
  alt?: string;
  onLinkClick?: () => void;
}

/**
 * Header logo link pointing to the home ('/') route.
 */
const LogoLink: React.FC<
  Pick<IconHeaderProps, 'onLinkClick' | 'headerTitle' | 'logo' | 'alt'> & {
    logoClassName?: string;
    showSidePanel?: boolean;
  }
> = ({ onLinkClick, logo, alt, logoClassName, showSidePanel }) => {
  return (
    <>
      <a
        href="/"
        className={clsx(
          'flex mx-auto lg:inline-block w-fit relative',
          'focus:outline-none focus-visible:ring focus-visible:ring-black/20 focus-visible:border-transparent',
          !showSidePanel ? '' : 'transition-opacity duration-300 opacity-0',
        )}
        onClick={onLinkClick}
      >
        <img className={logoClassName} src={logo} alt={alt} />
      </a>
    </>
  );
};

/**
 * Header navigation links rendered as React `NavLink` siblings encapsulated within a fragment.
 *
 * Each individual link (anchor tag) has the given `linkClassName` applied as its className and the
 * optional `onLinkClick` set as its `onClick` handler.
 */
const MenuLinks: React.FC<
  Pick<
    IconHeaderProps,
    | 'navigationLinks'
    | 'currentActiveLocation'
    | 'activeLinkClassName'
    | 'linkClassName'
    | 'hoverClassName'
    | 'onLinkClick'
  >
> = ({ navigationLinks, currentActiveLocation, activeLinkClassName, hoverClassName, linkClassName, onLinkClick }) => {
  return (
    <>
      {navigationLinks.map((item) => {
        return (
          <a
            key={item.name}
            href={item.href}
            className={clsx(
              currentActiveLocation?.includes(item.href) ? activeLinkClassName : linkClassName,
              hoverClassName,
              'font-serif font-medium text-center lg:text-left',
              'flex flex-col mt-2',
            )}
            onClick={onLinkClick}
          >
            {item.name}
          </a>
        );
      })}
    </>
  );
};

/**
 * Horizontal navigation bar for Desktop that's hidden via CSS media query for viewport widths below the
 * tailwind `lg` breakpoint.
 */
const DesktopIconBar: React.FC<IconHeaderProps> = ({ headerTitle, iconNavBarItems }) => {
  return (
    <div className="py-6 px-8">
      <a className="flex justify-start flex-1" href="/">
        <span className="sr-only">{headerTitle}</span>
      </a>

      <div className="flex">
        <div className="flex">
          {iconNavBarItems?.map((item) => (
            <a key={item.iconLink} href={item.iconLink} className="flex">
              <div className="w-14 h-14 ml-12 mr-3">{item.icon}</div>
              <div className="flex flex-col">
                <p className="text-lg font-medium font-serif">{item.title}</p>
                <p className="text-md font-serif text-gray-400">{item.undertext}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const DesktopNavBar: React.FC<IconHeaderProps> = ({
  navigationLinks,
  linkClassName,
  activeLinkClassName,
  hoverClassName,
  currentActiveLocation,
}) => {
  return (
    <div className="hidden space-x-12 lg:flex lg:flex-1 lg:justify-start lg:items-center">
      <MenuLinks
        navigationLinks={navigationLinks}
        linkClassName={linkClassName}
        hoverClassName={hoverClassName}
        activeLinkClassName={activeLinkClassName}
        currentActiveLocation={currentActiveLocation}
      />
    </div>
  );
};

/**
 * Horizontal navigation bar for Desktop that's hidden via CSS media query for viewport widths below the
 * tailwind `lg` breakpoint.
 */
const MobileIconBar: React.FC<IconHeaderProps> = ({ iconNavBarItems, buttonBorderColor, headerBgColor }) => {
  return (
    <div>
      <Popover.Panel className={clsx('absolute right-0 top-20 z-10 w-fit -translate-x-3 transform', headerBgColor)}>
        <ul className={clsx(buttonBorderColor, 'border-2')}>
          {iconNavBarItems?.map((item) => (
            <li key={item.iconLink} className="border-b-2 border-gray-200 last:border-0">
              <a
                href={item.iconLink}
                className={clsx(
                  'flex pl-6 pr-20 py-5',
                  'focus:outline-none focus-visible:ring focus-visible:ring-inset focus-visible:ring-black/20',
                )}
              >
                <div className="w-14 h-14 mr-4">{item.icon}</div>
                <div className="flex flex-col">
                  <p className="text-lg font-medium font-serif">{item.title}</p>
                  <p className="text-md font-serif text-gray-400">{item.undertext}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Popover.Panel>
    </div>
  );
};

/**
 * Header of ProjectLayout that displays branding and implements a responsive navigation menu
 * that leverages HeadlessUI's `Popover` component.
 */
const IconHeader: React.FC<
  IconHeaderProps & { onMenuOpen: () => void; onMenuClose: () => void; isPanelOpen: boolean }
> = ({
  navigationLinks,
  iconNavBarItems,
  headerTitle,
  headerBgColor,
  linkClassName,
  hoverClassName,
  activeLinkClassName,
  currentActiveLocation,
  buttonBgColor,
  buttonBorderColor,
  buttonTextColor,
  logo,
  logoClassName,
  alt,
  onMenuClose,
  onMenuOpen,
  isPanelOpen,
}) => {
  //   const [showSidePanel, setShowSidePanel] = useState(false);

  //   const closeMenuPanel = () => {
  //     setShowSidePanel(false);
  //   };
  return (
    <header>
      <div>
        <div className="flex justify-between lg:pb-2 lg:border-b-2 lg:border-gray-200/90">
          <div className="flex">
            <div className="flex items-center lg:hidden">
              {!isPanelOpen && (
                <button className="w-12 left-0 top-0" onClick={onMenuOpen}>
                  <HamburgerButton isOpen={isPanelOpen} />
                </button>
              )}
              <Transition.Root show={isPanelOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onMenuClose}>
                  <div className="fixed inset-0" />
                  <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                        <Transition.Child
                          as={Fragment}
                          enter="transform transition ease-in-out duration-500 sm:duration-700"
                          enterFrom="-translate-x-full"
                          enterTo="translate-x-0"
                          leave="transform transition ease-in-out duration-500 sm:duration-700"
                          leaveFrom="translate-x-0"
                          leaveTo="-translate-x-full"
                        >
                          <Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                              <div className="px-4 sm:px-6">
                                <div className="flex items-start justify-between">
                                  <div className="absolute top-0 right-0 -mr-16 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                    {isPanelOpen && (
                                      <button className={clsx(hoverClassName)} onClick={() => onMenuClose()}>
                                        <HamburgerButton isOpen={isPanelOpen} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                {logo ? (
                                  <LogoLink logo={logo} alt={alt} logoClassName={logoClassName} />
                                ) : (
                                  <p>{headerTitle}</p>
                                )}
                                <div className="pt-10">
                                  <MenuLinks
                                    navigationLinks={navigationLinks}
                                    linkClassName={linkClassName}
                                    hoverClassName={hoverClassName}
                                    activeLinkClassName={activeLinkClassName}
                                    currentActiveLocation={currentActiveLocation}
                                    // onLinkClick={onMenuClose}
                                  />
                                </div>
                              </div>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </div>
            {logo ? (
              <LogoLink logo={logo} alt={alt} logoClassName={logoClassName} showSidePanel={isPanelOpen} />
            ) : (
              <p>{headerTitle}</p>
            )}
          </div>
          <Popover className={clsx(headerBgColor, 'flex items-center justify-between')}>
            {({ open, close }) => (
              <>
                <div>
                  <div>
                    <Popover.Button
                      className={clsx(
                        'flex lg:hidden items-center justify-center p-2.5 mr-3',
                        'focus:outline-none focus:ring-1 focus-ring-inset focus:ring-black-100',
                        `border-2 ${buttonBorderColor}`,
                        open ? buttonBgColor : 'bg-white',
                      )}
                    >
                      <span className="sr-only">'open-navigation-menu'</span>
                      {open ? (
                        <ChevronUpIcon className="text-white h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className={clsx(buttonTextColor, 'h-4 w-4')} />
                      )}
                    </Popover.Button>
                  </div>
                  <div className={clsx(headerBgColor, 'hidden lg:inline-flex pr-28')}>
                    <DesktopIconBar
                      headerBgColor={headerBgColor}
                      iconNavBarItems={iconNavBarItems}
                      navigationLinks={navigationLinks}
                      activeLinkClassName={activeLinkClassName}
                      linkClassName={linkClassName}
                      hoverClassName={hoverClassName}
                    />
                  </div>
                </div>
                <div className="border-b-2 border-b-gray-200 m-0"></div>
                {/* popover containing mobile nav menu: */}
                <Transition
                  show={open}
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    static
                    className={clsx('absolute z-30 top-0 right-0 inset-x-0 transition lg:hidden')}
                  >
                    <MobileIconBar
                      headerBgColor={headerBgColor}
                      iconNavBarItems={iconNavBarItems}
                      navigationLinks={navigationLinks}
                      linkClassName={linkClassName}
                      hoverClassName={hoverClassName}
                      activeLinkClassName={activeLinkClassName}
                      buttonBorderColor={buttonBorderColor}
                    />
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
        <nav className="hidden lg:inline-flex w-screen pl-32 justify-start py-5 border-b-2 border-gray-200/90">
          <DesktopNavBar
            navigationLinks={navigationLinks}
            activeLinkClassName={activeLinkClassName}
            linkClassName={linkClassName}
            hoverClassName={hoverClassName}
            currentActiveLocation={currentActiveLocation}
          />
        </nav>
      </div>
    </header>
  );
};

export default IconHeader;