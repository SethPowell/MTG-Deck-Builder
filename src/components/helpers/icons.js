import {
	faTrash,
	faSignOutAlt,
	faEdit,
	faSpinner,
	faPlusCircle,
	faPhone,
	faEnvelope,
	faMapMarkerAlt,
	faUser,
	faSearch
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
	return library.add(
		faTrash,
		faSignOutAlt,
		faEdit,
		faSpinner,
		faPlusCircle,
		faPhone,
		faEnvelope,
		faMapMarkerAlt,
		faUser,
		faSearch
	);
};

export default Icons;
