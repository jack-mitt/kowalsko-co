import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import MenuIcon from '@material-ui/icons/Menu'

function Container({ style, className, onClick, onMouseEnter, onMouseLeave, id, children }) {

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      id={id}
      className={className}
      style={{
        fontFamily: 'Mansalva',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        ...style
      }}
    >
      {children}
    </div>
  )
}

function MobileMenu({ pageNames, selectedPage }) {

  const [active, setActive] = useState(false)
  console.log(active)
  return (
    <Container
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        background: `rgba(0,0,0,${active ? 0.6 : 0})`,
        transition: 'background 500ms ease-out',
        justifyContent: 'flex-start'
      }}
    >
      <Container
        style={{
          left: active ? '0px' : '-150px',
          width: '150px',
          flexFlow: 'column',
          justifyContent: 'flex-start',
          background: 'white',
          transition: 'left 500ms ease-out',
          pointerEvents: active ? 'auto' : 'none'
        }}
      >
        <Container style={{ height: '20px' }} />
        {
          pageNames.map(pageName =>
            <Container
              style={{
                height: '60px',
                fontSize: '24px'
              }}
            >
              {pageName.toUpperCase()}
            </Container>
          )
        }
        <Container
          onClick={() => setActive(active => !active)}
          style={{
            position: 'absolute',
            right: '-60px',
            filter: `invert(${active ? 100 : 0}%)`,
            top: '0',
            pointerEvents: 'auto',
            width: '60px',
            height: '60px'
          }}
        >
          <MenuIcon style={{ height: '30px', width: '30px' }} />
        </Container>
      </Container>
    </Container>
  )
}

function AppRouter({ pages }) {
  const [selectedPage, setSelectedPage] = useState(null)

  console.log(pages)
  useEffect(() => {
    if (pages && !selectedPage) {
      setSelectedPage(Object.keys(pages)[0])
    }
  }, [pages])

  const pageNames = useMemo(() => Object.keys(pages), [pages])

  console.log(selectedPage)

  return (
    <Container>
      {(pages && selectedPage) && React.createElement(pages[selectedPage].component)}
      <MobileMenu pageNames={pageNames} selectedPage={selectedPage} />
    </Container>
  )

}

function HomePage({ }) {

  return (
    <Container>
      HOME
    </Container>
  )
}

function ShopPage({ }) {
  return (
    <Container>
      Shop
    </Container>
  )
}

function ContactPage({ }) {
  return (
    <Container>
      Contact
    </Container>
  )
}

function GalleryPage({ }) {
  return (
    <Container>
      Gallery
    </Container>
  )
}

function App() {

  const pages = {
    'home': {
      component: HomePage,
    },
    'shop': {
      component: ShopPage
    },
    'gallery': {
      component: GalleryPage
    }
  }

  return (
    <Container>
      <AppRouter pages={pages} />
    </Container>
  );
}

export default App;
