import React, { useContext, useState } from "react";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import { WebContext } from "../../Context/WebDetails";
import { Link, useNavigate } from "react-router-dom";

function Navbars() {
  const { isOpen, onToggle } = useDisclosure();

  const webContext = useContext(WebContext);
  const { WebDetails, setWebDetails } = webContext;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMobToogel = () => {
    onToggle();
  };

  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    navigate(link.toLowerCase());
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"70px"}
        py={{ base: 2 }}
        px={{ base: 7 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}>
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align={{ base: "center" }}>
          <Text
            fontSize={"xl"}
            fontWeight={"semibold"}
            mb={0}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}>
            FunCool
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}>
          {!WebDetails.token ? (
            <>
              <Button
                onClick={() => {
                  handleLinkClick("/login");
                }}
                cursor={"pointer"}
                as={"a"}
                fontWeight={400}
                variant={"link"}>
                Login
              </Button>
              <Button
                onClick={() => {
                  handleLinkClick("/");
                }}
                cursor={"pointer"}
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue.400"}
                _hover={{
                  bg: "blue.300",
                }}>
                CREATE ACCOUNT
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setWebDetails((object) => {
                    localStorage.removeItem("z-story-obj");
                    return {
                      darkMode: false,
                    };
                  });
                }}
                as={"a"}
                fontWeight={400}>
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav handleMobToogel={handleMobToogel} WebDetails={WebDetails} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NavItem.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                p={2}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}>
                <Link to={navItem.href}>{navItem.label}</Link>
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel } = NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}>
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}>
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = ({ handleMobToogel, WebDetails }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}>
      {NavItem.map((navItem) => (
        <MobileNavItem
          handleMobToogel={handleMobToogel}
          key={navItem.label}
          {...navItem}
        />
      ))}
      {!WebDetails.token && (
        <MobileNavItem
          handleMobToogel={handleMobToogel}
          label="Create Account"
          href="/"
        />
      )}
    </Stack>
  );
};

const MobileNavItem = ({
  label,
  children,
  href,
  handleMobToogel,
} = NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        borderBottom={"1px solid rgb(0,0,0,0.2)"}
        py={3}
        cursor={"pointer"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
          backgroundColor: `${useColorModeValue("gray.50")}`,
        }}>
        {/* <Text
          fontWeight={600}
          > */}
        <Link
          style={{
            padding: "0px 5px",
            color: `${useColorModeValue("gray.600", "gray.200")}`,
            fontWeight: 600,
          }}
          onClick={handleMobToogel}
          to={href}>
          {label}
        </Link>
        {/* </Text> */}
      </Box>

      {/* <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}>
          {children &&
            children.map((child) => <Box key={child.label}>{child.label}</Box>)}
        </Stack>
      </Collapse> */}
    </Stack>
  );
};

const NavItem = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "AboutUs",
    href: "/about",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

export default Navbars;
