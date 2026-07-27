export function getCountryName(
	code: string,
	locale: Intl.UnicodeBCP47LocaleIdentifier | Intl.Locale = "en"
) {
	const regionNames = new Intl.DisplayNames([locale], { type: "region" });
	return regionNames.of(code);
}

/**
 * Country data with ISO code, international dial code, and emoji flag
 */
interface CountryData {
	/** ISO 3166-1 alpha-2 country code (lowercase) */
	code: string;
	/** International dial code with + prefix (e.g., "+1", "+44") */
	dialCode: string;
	/** Unicode emoji flag */
	flag: string;
}

/**
 * Static country data with pre-computed flags and dial codes
 */
export const COUNTRIES: CountryData[] = [
	{ code: "ad", dialCode: "+376", flag: "🇦🇩" },
	{ code: "ae", dialCode: "+971", flag: "🇦🇪" },
	{ code: "af", dialCode: "+93", flag: "🇦🇫" },
	{ code: "ag", dialCode: "+1-268", flag: "🇦🇬" },
	{ code: "ai", dialCode: "+1-264", flag: "🇦🇮" },
	{ code: "al", dialCode: "+355", flag: "🇦🇱" },
	{ code: "am", dialCode: "+374", flag: "🇦🇲" },
	{ code: "ao", dialCode: "+244", flag: "🇦🇴" },
	{ code: "aq", dialCode: "+672", flag: "🇦🇶" },
	{ code: "ar", dialCode: "+54", flag: "🇦🇷" },
	{ code: "as", dialCode: "+1-684", flag: "🇦🇸" },
	{ code: "at", dialCode: "+43", flag: "🇦🇹" },
	{ code: "au", dialCode: "+61", flag: "🇦🇺" },
	{ code: "aw", dialCode: "+297", flag: "🇦🇼" },
	{ code: "ax", dialCode: "+358", flag: "🇦🇽" },
	{ code: "az", dialCode: "+994", flag: "🇦🇿" },
	{ code: "ba", dialCode: "+387", flag: "🇧🇦" },
	{ code: "bb", dialCode: "+1-246", flag: "🇧🇧" },
	{ code: "bd", dialCode: "+880", flag: "🇧🇩" },
	{ code: "be", dialCode: "+32", flag: "🇧🇪" },
	{ code: "bf", dialCode: "+226", flag: "🇧🇫" },
	{ code: "bg", dialCode: "+359", flag: "🇧🇬" },
	{ code: "bh", dialCode: "+973", flag: "🇧🇭" },
	{ code: "bi", dialCode: "+257", flag: "🇧🇮" },
	{ code: "bj", dialCode: "+229", flag: "🇧🇯" },
	{ code: "bl", dialCode: "+590", flag: "🇧🇱" },
	{ code: "bm", dialCode: "+1-441", flag: "🇧🇲" },
	{ code: "bn", dialCode: "+673", flag: "🇧🇳" },
	{ code: "bo", dialCode: "+591", flag: "🇧🇴" },
	{ code: "bq", dialCode: "+599", flag: "🇧🇶" },
	{ code: "br", dialCode: "+55", flag: "🇧🇷" },
	{ code: "bs", dialCode: "+1-242", flag: "🇧🇸" },
	{ code: "bt", dialCode: "+975", flag: "🇧🇹" },
	{ code: "bv", dialCode: "+47", flag: "🇧🇻" },
	{ code: "bw", dialCode: "+267", flag: "🇧🇼" },
	{ code: "by", dialCode: "+375", flag: "🇧🇾" },
	{ code: "bz", dialCode: "+501", flag: "🇧🇿" },
	{ code: "ca", dialCode: "+1", flag: "🇨🇦" },
	{ code: "cc", dialCode: "+61", flag: "🇨🇨" },
	{ code: "cd", dialCode: "+243", flag: "🇨🇩" },
	{ code: "cf", dialCode: "+236", flag: "🇨🇫" },
	{ code: "cg", dialCode: "+242", flag: "🇨🇬" },
	{ code: "ch", dialCode: "+41", flag: "🇨🇭" },
	{ code: "ci", dialCode: "+225", flag: "🇨🇮" },
	{ code: "ck", dialCode: "+682", flag: "🇨🇰" },
	{ code: "cl", dialCode: "+56", flag: "🇨🇱" },
	{ code: "cm", dialCode: "+237", flag: "🇨🇲" },
	{ code: "cn", dialCode: "+86", flag: "🇨🇳" },
	{ code: "co", dialCode: "+57", flag: "🇨🇴" },
	{ code: "cr", dialCode: "+506", flag: "🇨🇷" },
	{ code: "cu", dialCode: "+53", flag: "🇨🇺" },
	{ code: "cv", dialCode: "+238", flag: "🇨🇻" },
	{ code: "cw", dialCode: "+599", flag: "🇨🇼" },
	{ code: "cx", dialCode: "+61", flag: "🇨🇽" },
	{ code: "cy", dialCode: "+357", flag: "🇨🇾" },
	{ code: "cz", dialCode: "+420", flag: "🇨🇿" },
	{ code: "de", dialCode: "+49", flag: "🇩🇪" },
	{ code: "dj", dialCode: "+253", flag: "🇩🇯" },
	{ code: "dk", dialCode: "+45", flag: "🇩🇰" },
	{ code: "dm", dialCode: "+1-767", flag: "🇩🇲" },
	{ code: "do", dialCode: "+1-809", flag: "🇩🇴" },
	{ code: "dz", dialCode: "+213", flag: "🇩🇿" },
	{ code: "ec", dialCode: "+593", flag: "🇪🇨" },
	{ code: "ee", dialCode: "+372", flag: "🇪🇪" },
	{ code: "eg", dialCode: "+20", flag: "🇪🇬" },
	{ code: "eh", dialCode: "+212", flag: "🇪🇭" },
	{ code: "er", dialCode: "+291", flag: "🇪🇷" },
	{ code: "es", dialCode: "+34", flag: "🇪🇸" },
	{ code: "et", dialCode: "+251", flag: "🇪🇹" },
	{ code: "fi", dialCode: "+358", flag: "🇫🇮" },
	{ code: "fj", dialCode: "+679", flag: "🇫🇯" },
	{ code: "fk", dialCode: "+500", flag: "🇫🇰" },
	{ code: "fm", dialCode: "+691", flag: "🇫🇲" },
	{ code: "fo", dialCode: "+298", flag: "🇫🇴" },
	{ code: "fr", dialCode: "+33", flag: "🇫🇷" },
	{ code: "ga", dialCode: "+241", flag: "🇬🇦" },
	{ code: "gb", dialCode: "+44", flag: "🇬🇧" },
	{ code: "gd", dialCode: "+1-473", flag: "🇬🇩" },
	{ code: "ge", dialCode: "+995", flag: "🇬🇪" },
	{ code: "gf", dialCode: "+594", flag: "🇬🇫" },
	{ code: "gg", dialCode: "+44", flag: "🇬🇬" },
	{ code: "gh", dialCode: "+233", flag: "🇬🇭" },
	{ code: "gi", dialCode: "+350", flag: "🇬🇮" },
	{ code: "gl", dialCode: "+299", flag: "🇬🇱" },
	{ code: "gm", dialCode: "+220", flag: "🇬🇲" },
	{ code: "gn", dialCode: "+224", flag: "🇬🇳" },
	{ code: "gp", dialCode: "+590", flag: "🇬🇵" },
	{ code: "gq", dialCode: "+240", flag: "🇬🇶" },
	{ code: "gr", dialCode: "+30", flag: "🇬🇷" },
	{ code: "gs", dialCode: "+500", flag: "🇬🇸" },
	{ code: "gt", dialCode: "+502", flag: "🇬🇹" },
	{ code: "gu", dialCode: "+1-671", flag: "🇬🇺" },
	{ code: "gw", dialCode: "+245", flag: "🇬🇼" },
	{ code: "gy", dialCode: "+592", flag: "🇬🇾" },
	{ code: "hk", dialCode: "+852", flag: "🇭🇰" },
	{ code: "hm", dialCode: "+672", flag: "🇭🇲" },
	{ code: "hn", dialCode: "+504", flag: "🇭🇳" },
	{ code: "hr", dialCode: "+385", flag: "🇭🇷" },
	{ code: "ht", dialCode: "+509", flag: "🇭🇹" },
	{ code: "hu", dialCode: "+36", flag: "🇭🇺" },
	{ code: "id", dialCode: "+62", flag: "🇮🇩" },
	{ code: "ie", dialCode: "+353", flag: "🇮🇪" },
	{ code: "il", dialCode: "+972", flag: "🇮🇱" },
	{ code: "im", dialCode: "+44", flag: "🇮🇲" },
	{ code: "in", dialCode: "+91", flag: "🇮🇳" },
	{ code: "io", dialCode: "+246", flag: "🇮🇴" },
	{ code: "iq", dialCode: "+964", flag: "🇮🇶" },
	{ code: "ir", dialCode: "+98", flag: "🇮🇷" },
	{ code: "is", dialCode: "+354", flag: "🇮🇸" },
	{ code: "it", dialCode: "+39", flag: "🇮🇹" },
	{ code: "je", dialCode: "+44", flag: "🇯🇪" },
	{ code: "jm", dialCode: "+1-876", flag: "🇯🇲" },
	{ code: "jo", dialCode: "+962", flag: "🇯🇴" },
	{ code: "jp", dialCode: "+81", flag: "🇯🇵" },
	{ code: "ke", dialCode: "+254", flag: "🇰🇪" },
	{ code: "kg", dialCode: "+996", flag: "🇰🇬" },
	{ code: "kh", dialCode: "+855", flag: "🇰🇭" },
	{ code: "ki", dialCode: "+686", flag: "🇰🇮" },
	{ code: "km", dialCode: "+269", flag: "🇰🇲" },
	{ code: "kn", dialCode: "+1-869", flag: "🇰🇳" },
	{ code: "kp", dialCode: "+850", flag: "🇰🇵" },
	{ code: "kr", dialCode: "+82", flag: "🇰🇷" },
	{ code: "kw", dialCode: "+965", flag: "🇰🇼" },
	{ code: "ky", dialCode: "+1-345", flag: "🇰🇾" },
	{ code: "kz", dialCode: "+7", flag: "🇰🇿" },
	{ code: "la", dialCode: "+856", flag: "🇱🇦" },
	{ code: "lb", dialCode: "+961", flag: "🇱🇧" },
	{ code: "lc", dialCode: "+1-758", flag: "🇱🇨" },
	{ code: "li", dialCode: "+423", flag: "🇱🇮" },
	{ code: "lk", dialCode: "+94", flag: "🇱🇰" },
	{ code: "lr", dialCode: "+231", flag: "🇱🇷" },
	{ code: "ls", dialCode: "+266", flag: "🇱🇸" },
	{ code: "lt", dialCode: "+370", flag: "🇱🇹" },
	{ code: "lu", dialCode: "+352", flag: "🇱🇺" },
	{ code: "lv", dialCode: "+371", flag: "🇱🇻" },
	{ code: "ly", dialCode: "+218", flag: "🇱🇾" },
	{ code: "ma", dialCode: "+212", flag: "🇲🇦" },
	{ code: "mc", dialCode: "+377", flag: "🇲🇨" },
	{ code: "md", dialCode: "+373", flag: "🇲🇩" },
	{ code: "me", dialCode: "+382", flag: "🇲🇪" },
	{ code: "mf", dialCode: "+590", flag: "🇲🇫" },
	{ code: "mg", dialCode: "+261", flag: "🇲🇬" },
	{ code: "mh", dialCode: "+692", flag: "🇲🇭" },
	{ code: "mk", dialCode: "+389", flag: "🇲🇰" },
	{ code: "ml", dialCode: "+223", flag: "🇲🇱" },
	{ code: "mm", dialCode: "+95", flag: "🇲🇲" },
	{ code: "mn", dialCode: "+976", flag: "🇲🇳" },
	{ code: "mo", dialCode: "+853", flag: "🇲🇴" },
	{ code: "mp", dialCode: "+1-670", flag: "🇲🇵" },
	{ code: "mq", dialCode: "+596", flag: "🇲🇶" },
	{ code: "mr", dialCode: "+222", flag: "🇲🇷" },
	{ code: "ms", dialCode: "+1-664", flag: "🇲🇸" },
	{ code: "mt", dialCode: "+356", flag: "🇲🇹" },
	{ code: "mu", dialCode: "+230", flag: "🇲🇺" },
	{ code: "mv", dialCode: "+960", flag: "🇲🇻" },
	{ code: "mw", dialCode: "+265", flag: "🇲🇼" },
	{ code: "mx", dialCode: "+52", flag: "🇲🇽" },
	{ code: "my", dialCode: "+60", flag: "🇲🇾" },
	{ code: "mz", dialCode: "+258", flag: "🇲🇿" },
	{ code: "na", dialCode: "+264", flag: "🇳🇦" },
	{ code: "nc", dialCode: "+687", flag: "🇳🇨" },
	{ code: "ne", dialCode: "+227", flag: "🇳🇪" },
	{ code: "nf", dialCode: "+672", flag: "🇳🇫" },
	{ code: "ng", dialCode: "+234", flag: "🇳🇬" },
	{ code: "ni", dialCode: "+505", flag: "🇳🇮" },
	{ code: "nl", dialCode: "+31", flag: "🇳🇱" },
	{ code: "no", dialCode: "+47", flag: "🇳🇴" },
	{ code: "np", dialCode: "+977", flag: "🇳🇵" },
	{ code: "nr", dialCode: "+674", flag: "🇳🇷" },
	{ code: "nu", dialCode: "+683", flag: "🇳🇺" },
	{ code: "nz", dialCode: "+64", flag: "🇳🇿" },
	{ code: "om", dialCode: "+968", flag: "🇴🇲" },
	{ code: "pa", dialCode: "+507", flag: "🇵🇦" },
	{ code: "pe", dialCode: "+51", flag: "🇵🇪" },
	{ code: "pf", dialCode: "+689", flag: "🇵🇫" },
	{ code: "pg", dialCode: "+675", flag: "🇵🇬" },
	{ code: "ph", dialCode: "+63", flag: "🇵🇭" },
	{ code: "pk", dialCode: "+92", flag: "🇵🇰" },
	{ code: "pl", dialCode: "+48", flag: "🇵🇱" },
	{ code: "pm", dialCode: "+508", flag: "🇵🇲" },
	{ code: "pn", dialCode: "+64", flag: "🇵🇳" },
	{ code: "pr", dialCode: "+1-787", flag: "🇵🇷" },
	{ code: "ps", dialCode: "+970", flag: "🇵🇸" },
	{ code: "pt", dialCode: "+351", flag: "🇵🇹" },
	{ code: "pw", dialCode: "+680", flag: "🇵🇼" },
	{ code: "py", dialCode: "+595", flag: "🇵🇾" },
	{ code: "qa", dialCode: "+974", flag: "🇶🇦" },
	{ code: "re", dialCode: "+262", flag: "🇷🇪" },
	{ code: "ro", dialCode: "+40", flag: "🇷🇴" },
	{ code: "rs", dialCode: "+381", flag: "🇷🇸" },
	{ code: "ru", dialCode: "+7", flag: "🇷🇺" },
	{ code: "rw", dialCode: "+250", flag: "🇷🇼" },
	{ code: "sa", dialCode: "+966", flag: "🇸🇦" },
	{ code: "sb", dialCode: "+677", flag: "🇸🇧" },
	{ code: "sc", dialCode: "+248", flag: "🇸🇨" },
	{ code: "sd", dialCode: "+249", flag: "🇸🇩" },
	{ code: "se", dialCode: "+46", flag: "🇸🇪" },
	{ code: "sg", dialCode: "+65", flag: "🇸🇬" },
	{ code: "sh", dialCode: "+290", flag: "🇸🇭" },
	{ code: "si", dialCode: "+386", flag: "🇸🇮" },
	{ code: "sj", dialCode: "+47", flag: "🇸🇯" },
	{ code: "sk", dialCode: "+421", flag: "🇸🇰" },
	{ code: "sl", dialCode: "+232", flag: "🇸🇱" },
	{ code: "sm", dialCode: "+378", flag: "🇸🇲" },
	{ code: "sn", dialCode: "+221", flag: "🇸🇳" },
	{ code: "so", dialCode: "+252", flag: "🇸🇴" },
	{ code: "sr", dialCode: "+597", flag: "🇸🇷" },
	{ code: "ss", dialCode: "+211", flag: "🇸🇸" },
	{ code: "st", dialCode: "+239", flag: "🇸🇹" },
	{ code: "sv", dialCode: "+503", flag: "🇸🇻" },
	{ code: "sx", dialCode: "+1-721", flag: "🇸🇽" },
	{ code: "sy", dialCode: "+963", flag: "🇸🇾" },
	{ code: "sz", dialCode: "+268", flag: "🇸🇿" },
	{ code: "tc", dialCode: "+1-649", flag: "🇹🇨" },
	{ code: "td", dialCode: "+235", flag: "🇹🇩" },
	{ code: "tf", dialCode: "+262", flag: "🇹🇫" },
	{ code: "tg", dialCode: "+228", flag: "🇹🇬" },
	{ code: "th", dialCode: "+66", flag: "🇹🇭" },
	{ code: "tj", dialCode: "+992", flag: "🇹🇯" },
	{ code: "tk", dialCode: "+690", flag: "🇹🇰" },
	{ code: "tl", dialCode: "+670", flag: "🇹🇱" },
	{ code: "tm", dialCode: "+993", flag: "🇹🇲" },
	{ code: "tn", dialCode: "+216", flag: "🇹🇳" },
	{ code: "to", dialCode: "+676", flag: "🇹🇴" },
	{ code: "tr", dialCode: "+90", flag: "🇹🇷" },
	{ code: "tt", dialCode: "+1-868", flag: "🇹🇹" },
	{ code: "tv", dialCode: "+688", flag: "🇹🇻" },
	{ code: "tw", dialCode: "+886", flag: "🇹🇼" },
	{ code: "tz", dialCode: "+255", flag: "🇹🇿" },
	{ code: "ua", dialCode: "+380", flag: "🇺🇦" },
	{ code: "ug", dialCode: "+256", flag: "🇺🇬" },
	{ code: "um", dialCode: "+1", flag: "🇺🇲" },
	{ code: "us", dialCode: "+1", flag: "🇺🇸" },
	{ code: "uy", dialCode: "+598", flag: "🇺🇾" },
	{ code: "uz", dialCode: "+998", flag: "🇺🇿" },
	{ code: "va", dialCode: "+379", flag: "🇻🇦" },
	{ code: "vc", dialCode: "+1-784", flag: "🇻🇨" },
	{ code: "ve", dialCode: "+58", flag: "🇻🇪" },
	{ code: "vg", dialCode: "+1-284", flag: "🇻🇬" },
	{ code: "vi", dialCode: "+1-340", flag: "🇻🇮" },
	{ code: "vn", dialCode: "+84", flag: "🇻🇳" },
	{ code: "vu", dialCode: "+678", flag: "🇻🇺" },
	{ code: "wf", dialCode: "+681", flag: "🇼🇫" },
	{ code: "ws", dialCode: "+685", flag: "🇼🇸" },
	{ code: "xk", dialCode: "+383", flag: "🇽🇰" },
	{ code: "ye", dialCode: "+967", flag: "🇾🇪" },
	{ code: "yt", dialCode: "+262", flag: "🇾🇹" },
	{ code: "za", dialCode: "+27", flag: "🇿🇦" },
	{ code: "zm", dialCode: "+260", flag: "🇿🇲" },
	{ code: "zw", dialCode: "+263", flag: "🇿🇼" }
];

/**
 * Get country data by ISO code
 */
export const getCountryByCode = (code: string): CountryData | undefined =>
	COUNTRIES.find(c => c.code === code.toLowerCase());

/**
 * Get dial code for a country
 */
export const getDialCode = (code: string): string => getCountryByCode(code)?.dialCode || "";

/**
 * Get flag for a country
 */
export const getCountryFlag = (code: string): string => getCountryByCode(code)?.flag || "";

/**
 * Get countries for Select dropdown (backward compatible)
 */
export const getCountries = (placeholder: string, locale: string) => [
	{ value: "", label: placeholder },
	...COUNTRIES.map(c => ({
		value: c.code,
		label: getCountryName(c.code.toUpperCase(), locale) ?? c.code.toUpperCase()
	})).sort((a, b) => a.label.localeCompare(b.label))
];

/**
 * Country with flag for country select dropdown
 */
export interface CountryWithFlag {
	code: string;
	name: string;
	flag: string;
}

/**
 * Country with dial code for phone input
 */
export interface CountryWithDialCode {
	code: string;
	name: string;
	dialCode: string;
	flag: string;
}

/**
 * Get countries with full data for phone input
 */
export const getCountriesWithDialCodes = (locale: string): CountryWithDialCode[] =>
	COUNTRIES.map(c => ({
		code: c.code,
		name: getCountryName(c.code.toUpperCase(), locale) ?? c.code.toUpperCase(),
		dialCode: c.dialCode,
		flag: c.flag
	})).sort((a, b) => a.name.localeCompare(b.name));

/**
 * Get countries with flags for country select dropdown
 */
export const getCountriesWithFlags = (locale: string): CountryWithFlag[] =>
	COUNTRIES.map(c => ({
		code: c.code,
		name: getCountryName(c.code.toUpperCase(), locale) ?? c.code.toUpperCase(),
		flag: c.flag
	})).sort((a, b) => a.name.localeCompare(b.name));

/**
 * Normalize dial code by removing hyphens (e.g., "+1-268" -> "+1268")
 */
export const normalizeDialCode = (dialCode: string): string => dialCode.replace(/-/g, "");

/**
 * Default country to use when none is found
 */
export const DEFAULT_COUNTRY: CountryData = { code: "us", dialCode: "+1", flag: "🇺🇸" };
