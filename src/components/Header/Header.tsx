import { Navbar, NavbarBrand } from '@heroui/navbar';
import { Image } from '@heroui/image';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import './header.css';


export const Header = () => {
  return (
    <Navbar 
      isBordered 
      className="navbar" 
      classNames={{
        base: "justify-between bg-background-[rgb(246, 246, 246)]", 
        wrapper: "max-w-[100%] px-0"
      }}
    >
      <div className="navbar_container">
          <NavbarBrand className="brand_container">
            <Image src="dashboard/src/imgs/logo.png" className="brand_img" />
            <span className="brand_text">Analytics Dashboard</span>
          </NavbarBrand>
          <div className="navbar_button">
            <a href="mailto:">
              <Button color="primary" variant="flat" className="mail_btn">
                <Icon icon="lucide:mail"/>
                Write to us
              </Button>
            </a>
          </div>
      </div>
    </Navbar>
  )
}
