import { House, User, Bell, Menu, User2, Settings, LogOut } from "lucide-react";
import { Avatar, Button, Dropdown, Label, Separator } from '@heroui/react';
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(pathname);
    
  useEffect(() => {
    setCurrentTab(pathname)
  }, [pathname])
  
  const {isAuthenticated,removeUserToken,currentUserInfo} = useAuth();

  return (
    <nav className="w-full h-18 bg-white border-b border-gray-200 sticky top-0 z-50 px-4 md:px-8">
      <div className="max-w-7xl h-full mx-auto flex items-center justify-between">

        {/* Left Section: Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white text-[10px] font-black tracking-wider">ROUTE</span>
          </div>
          <p className="font-bold text-xl text-brand-dark-blue tracking-tight hidden sm:block">
            Route Posts
          </p>
        </div>

        {/* Central Navigation Pills (Hidden on Mobile) */}
        {isAuthenticated &&
          <>
            <div className="hidden md:flex bg-[#f8fafc] border border-slate-100 rounded-full p-1 gap-1">
              <NavLink to='/' onClick={() => setCurrentTab('/')}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200
              ${currentTab === '/'
                    ? 'bg-white text-brand-blue shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'

                  } `}
              >

                <House />
                <span>Feed</span>
              </NavLink>

              <NavLink to='/profile'
                onClick={() => setCurrentTab('/profile')}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 
              ${currentTab === '/profile'
                    ? 'bg-white text-brand-blue shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'

                  }`}
              >
                <User size={18} />
                <span>Profile</span>
              </NavLink>

              <NavLink to='/notification'
                onClick={() => setCurrentTab('/notification')}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 
              ${currentTab === '/notification'
                    ? 'bg-white text-brand-blue shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'

                  }`}
              >
                <Bell size={18} />
                <span>Notifications</span>
              </NavLink>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full py-1.5 pl-1.5 pr-4 shadow-sm hover:border-slate-300 transition-colors cursor-pointer">
                <Avatar>
                  <Avatar.Image  src={currentUserInfo?.photo}/>
                </Avatar>
                <span className="text-sm font-semibold text-slate-700 hidden sm:block">
                  {currentUserInfo?.name}
                </span>
                <Dropdown>

                  <Button isIconOnly aria-label="Menu" variant="ghost" className="bg-none">
                    <Menu className="outline-none " />
                  </Button>
                  <Dropdown.Popover className="min-w-55">
                    <Dropdown.Menu>
                      <Dropdown.Section>
                        <Dropdown.Item id="profile" textValue="Profile" onClick={()=>navigate(`/profile`)}>
                          <div className="flex h-8  justify-center items-center">
                            <User2 className="size-4 shrink-0 text-muted" />
                          </div>
                          <div className="flex flex-col">
                            <Label>Profile</Label>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item id="settings" textValue="Settings" onClick={()=>navigate("/settings")}>
                          <div className="flex h-8 items-center justify-center">
                            <Settings className="size-4 shrink-0 text-muted" />
                          </div>
                          <div className="flex flex-col">
                            <Label>Settings</Label>
                          </div>
                        </Dropdown.Item>

                      </Dropdown.Section>
                      <Separator />
                      <Dropdown.Section>
                        <Dropdown.Item id="log-out" textValue="Log Out" variant="danger" onPress={removeUserToken}>
                          <div className="flex h-8 items-center justify-center pt-px">
                            <LogOut className="size-4 shrink-0 text-danger" />
                          </div>
                          <div className="flex flex-col">
                            <Label>Log Out</Label>
                          </div>

                        </Dropdown.Item>
                      </Dropdown.Section>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            </div>
          </>

        }


      </div>
    </nav>
  );
}
