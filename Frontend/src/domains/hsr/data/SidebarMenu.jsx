import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import FolderIcon from '@mui/icons-material/Folder';

export const SidebarMenu = [
    {
        id: 1,
        title: "Home",
        icon: <HomeRoundedIcon />,
        url: "/honkai-star-rail"
    },
    {
        id: 2,
        title: "Tier list",
        icon: <MilitaryTechRoundedIcon />,
        url: "/honkai-star-rail/tier-list"
    },
    {
        id: 3,
        title: "Characters",
        icon: <PeopleAltRoundedIcon />,
        url: "/honkai-star-rail/characters"
    },
    {
        id: 4,
        title: "Light Cones",
        icon: <FolderIcon />,
        url: "/honkai-star-rail/light-cones"
    },
]