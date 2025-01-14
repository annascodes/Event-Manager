import React, { useEffect, useState } from 'react'
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { FaRupeeSign } from "react-icons/fa6";
import { LuBookmarkCheck } from "react-icons/lu";
import { LuBookmark } from "react-icons/lu";
import { PiMoney } from "react-icons/pi";
import { BiTimeFive } from "react-icons/bi";
import { IoHeartSharp } from "react-icons/io5";
import { HiArrowNarrowRight } from "react-icons/hi";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { RiCheckboxBlankLine } from "react-icons/ri";
import { RiCheckboxFill } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";
import { PiDotOutlineFill } from "react-icons/pi";
import { RxIdCard } from "react-icons/rx";
import { RiMoreFill } from "react-icons/ri";
import { TbCalendarCancel } from "react-icons/tb";
import { FaRegCalendarTimes } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { GiPartyFlags } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { BsPostcard } from "react-icons/bs";
import { TbMail } from "react-icons/tb";
import { HiOutlineTicket } from "react-icons/hi";
import { GrStatusGood } from "react-icons/gr";
import { RiCheckFill } from "react-icons/ri";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { TbCards } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";
import { GoDot } from "react-icons/go";
import { HiOutlineLogout } from "react-icons/hi";
import { FaMinus } from "react-icons/fa6";
import { FaEquals } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { LuUserRound } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { LuImages } from "react-icons/lu";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { LuBadgeHelp } from "react-icons/lu";
import { BsBookmark } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";





export const iconNames = [
    "threePeople",
    "admin",
    "cards",
    "plane",
    "tick",
    "good",
    "ticket",
    "mail",
    "event",
    "rightArrow2",
    "file",
    "delete",
    "close",
    "party",
    "edit",
    "user",
    "plus",
    "users2",
    "users",
    "cancelCalender2",
    "cancelCalender",
    "more",
    "idCard",
    "dot",
    "dropdownArrow",
    "checkBox",
    "unCheckBox",
    "leftArrow",
    "rightArrow",
    "filledHeart",
    "location",
    "calender",
    "rupee",
    "bookmarkChecked",
    "bookmark",
    "money",
    "time",
    "smallCircle",
    "logout",
    "minus",
    "equals",
    'image',
    'userOutline',
    'plus2',
    'images',
    'closeEye',
    'openEye',
    'search',
    'badge',
    'notMarked',
    'marked'
    


  ];
  
const Icons = ({ iconName = null, size = '', color = '' }) => {
    return (
        <div>
            

            {
                iconName === 'marked' &&
                <BsFillBookmarkFill className={`text-${size} ${color}`} />

            }

            {
                iconName === 'notMarked' &&
                <BsBookmark className={`text-${size} ${color}`} />

            }
            {
                iconName === 'badge' &&
                <LuBadgeHelp className={`text-${size} ${color}`} />

            }
            {
                iconName === 'search' &&
                <IoMdSearch className={`text-${size} ${color}`} />

            }
            {
                iconName === 'openEye' &&
                <GoEye className={`text-${size} ${color}`} />

            }
            {
                iconName === 'closeEye' &&
                <GoEyeClosed className={`text-${size} ${color}`} />

            }
            {
                iconName === 'images' &&
                <LuImages className={`text-${size} ${color}`} />

            }
            {
                iconName === 'plus2' &&
                <GoPlus className={`text-${size} ${color}`} />

            }
            {
                iconName === 'userOutline' &&
                <LuUserRound className={`text-${size} ${color}`} />

            }
            {
                iconName === 'image' &&
                <CiImageOn className={`text-${size} ${color}`} />

            }
            {
                iconName === 'threeDots' &&
                <BsThreeDotsVertical className={`text-${size} ${color}`} />

            }
            {
                iconName === 'equals' &&
                <FaEquals className={`text-${size} ${color}`} />

            }
            {
                iconName === 'minus' &&
                <FaMinus className={`text-${size} ${color}`} />

            }
            {
                iconName === 'logout' &&
                <HiOutlineLogout className={`text-${size} ${color}`} />

            }
            {
                iconName === 'smallCircle' &&
                <GoDot className={`text-${size} ${color}`} />

            }
            {
                iconName === 'threePeople' &&
                <GiThreeFriends className={`text-${size} ${color}`} />

            }
            {
                iconName === 'admin' &&
                <MdOutlineAdminPanelSettings className={`text-${size} ${color}`} />

            }
            {
                iconName === 'cards' &&
                <TbCards className={`text-${size} ${color}`} />

            }
            {
                iconName === 'plane' &&
                <HiMiniPaperAirplane className={`text-${size} ${color}`} />

            }
            {
                iconName === 'tick' &&
                <RiCheckFill className={`text-${size} ${color}`} />

            }
            {
                iconName === 'good' &&
                <GrStatusGood className={`text-${size} ${color}`} />

            }
            {
                iconName === 'ticket' &&
                <HiOutlineTicket className={`text-${size} ${color}`} />

            }
            {
                iconName === 'mail' &&
                <TbMail className={`text-${size} ${color}`} />

            }
            {
                iconName === 'event' &&
                <BsPostcard className={`text-${size} ${color}`} />

            }
            {
                iconName === 'rightArrow2' &&
                <HiArrowLongRight className={`text-${size} ${color}`} />

            }
            {
                iconName === 'file' &&
                <FaRegFileLines className={`text-${size} ${color}`} />

            }
            {
                iconName === 'delete' &&
                <MdOutlineDeleteOutline className={`text-${size} ${color}`} />

            }
            {
                iconName === 'close' &&
                <IoMdClose className={`text-${size} ${color}`} />

            }
            {
                iconName === 'party' &&
                <GiPartyFlags className={`text-${size} ${color}`} />

            }
            {
                iconName === 'edit' &&
                <TbEdit className={`text-${size} ${color}`} />

            }
            {
                iconName === 'user' &&
                <RiUser3Fill className={`text-${size} ${color}`} />

            }
            {
                iconName === 'plus' &&
                <FaPlus className={`text-${size} ${color}`} />

            }
            {
                iconName === 'users2' &&
                <BsPeopleFill className={`text-${size} ${color}`} />

            }
            {
                iconName === 'users' &&
                <PiUsersThreeFill className={`text-${size} ${color}`} />

            }
            {
                iconName === 'cancelCalender2' &&
                <FaRegCalendarTimes className={`text-${size} ${color}`} />

            }
            {
                iconName === 'cancelCalender' &&
                <TbCalendarCancel className={`text-${size} ${color}`} />

            }
            {
                iconName === 'more' &&
                <RiMoreFill className={`text-${size} ${color}`} />

            }
            {
                iconName === 'idCard' &&
                <RxIdCard className={`text-${size} ${color}`} />

            }
            {
                iconName === 'dot' &&
                <PiDotOutlineFill className={`text-${size} ${color}`} />

            }
            {
                iconName === 'dropdownArrow' &&
                <IoIosArrowDropdown className={`text-${size} ${color}`} />

            }
            {
                iconName === 'checkBox' &&
                <RiCheckboxFill className={`text-${size} ${color}`} />

            }
            {
                iconName === 'unCheckBox' &&
                <RiCheckboxBlankLine className={`text-${size} ${color}`} />

            }
            {
                iconName === 'leftArrow' &&
                <HiArrowNarrowLeft className={`text-${size} ${color}`} />

            }
            {
                iconName === 'rightArrow' &&
                <HiArrowNarrowRight className={`text-${size} ${color}`} />

            }
            {
                iconName === 'filledHeart' &&
                <IoHeartSharp className={`text-${size} ${color}`} />

            }
            {
                iconName === 'location' &&
                <SlLocationPin className={`text-${size} ${color}`} />

            }
            {
                iconName === 'calender' &&
                <HiOutlineCalendarDateRange className={`text-${size} text-${color}-500`} />

            }
            {
                iconName === 'rupee' &&
                <FaRupeeSign className={`text-${size} text-${color}-500`} />

            }
            {
                iconName === 'bookmarkChecked' &&
                <LuBookmarkCheck className={`text-${size} text-${color}-500`} />

            }
            {
                iconName === 'bookmark' &&
                <LuBookmark className={`text-${size} text-${color}-500`} />

            }
            {
                iconName === 'money' &&
                <PiMoney className={`text-${size} text-${color}-500`} />

            }
            {
                iconName === 'time' &&
                <BiTimeFive className={`text-${size} text-${color}-500`} />

            }

        </div>
    )
}

export default Icons
