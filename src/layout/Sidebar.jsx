import {
  Button,
  Drawer,
  Sidebar as FlowbiteSidebar,
  TextInput,
} from "flowbite-react"; // Renamed Sidebar import
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";

export function CustomSidebar() {
  // Renamed the component to CustomSidebar
  const [isOpen, setIsOpen] = useState(false); // Set to false initially for better UX

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Show navigation</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" />
        <Drawer.Items>
          <FlowbiteSidebar // Use FlowbiteSidebar instead of Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form>
                <FlowbiteSidebar.Items>
                  {" "}
                  {/* Use FlowbiteSidebar.Items instead of Sidebar.Items */}
                  <FlowbiteSidebar.ItemGroup>
                    {" "}
                    {/* Use FlowbiteSidebar.ItemGroup instead of Sidebar.ItemGroup */}
                    <FlowbiteSidebar.Item href="/" icon={HiChartPie}>
                      Dashboard
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item
                      href="/e-commerce/products"
                      icon={HiShoppingBag}
                    >
                      Products
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item href="/users/list" icon={HiUsers}>
                      Users list
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item
                      href="/authentication/sign-in"
                      icon={HiLogin}
                    >
                      Sign in
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item
                      href="/authentication/sign-up"
                      icon={HiPencil}
                    >
                      Sign up
                    </FlowbiteSidebar.Item>
                  </FlowbiteSidebar.ItemGroup>
                  <FlowbiteSidebar.ItemGroup>
                    <FlowbiteSidebar.Item
                      href="https://github.com/themesberg/flowbite-react/"
                      icon={HiClipboard}
                    >
                      Docs
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item
                      href="https://flowbite-react.com/"
                      icon={HiCollection}
                    >
                      Components
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item
                      href="https://github.com/themesberg/flowbite-react/issues"
                      icon={HiInformationCircle}
                    >
                      Help
                    </FlowbiteSidebar.Item>
                  </FlowbiteSidebar.ItemGroup>
                </FlowbiteSidebar.Items>
              </div>
            </div>
          </FlowbiteSidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
