import React from "react";
import { Select } from "antd";
// import symptoms from "../addPatient/symptomList.json";

const symptoms = [
    {
        id: 1,
        name: "Abdominal distension",
    },
    {
        id: 2,
        name: "Abdominal Pain",
    },
    {
        id: 3,
        name: "Abnormal Behaviour",
    },
    {
        id: 4,
        name: "Abnormal body movement",
    },
    {
        id: 5,
        name: "Abnormal Posture / GAIT",
    },
    {
        id: 6,
        name: "Absent cry at birth",
    },
    {
        id: 7,
        name: "Acne",
    },
    {
        id: 8,
        name: "Allergen",
    },
    {
        id: 9,
        name: "Altered sensorium",
    },
    {
        id: 10,
        name: "Anxiety",
    },
    {
        id: 11,
        name: "Asthenopic Symptom",
    },
    {
        id: 12,
        name: "Atopy",
    },
    {
        id: 13,
        name: "Back or flank pain",
    },
    {
        id: 14,
        name: "Back pain",
    },
    {
        id: 15,
        name: "Backache",
    },
    {
        id: 16,
        name: "Bleeding PV",
    },
    {
        id: 17,
        name: "Blepharospasm",
    },
    {
        id: 18,
        name: "Blindness",
    },
    {
        id: 19,
        name: "Blister",
    },
    {
        id: 20,
        name: "Blood from ear",
    },
    {
        id: 21,
        name: "Blood from mouth",
    },
    {
        id: 22,
        name: "Blood from nose",
    },
    {
        id: 23,
        name: "Blood in urine",
    },
    {
        id: 24,
        name: "Bloody diarrhea",
    },
    {
        id: 25,
        name: "bluish discoloration",
    },
    {
        id: 26,
        name: "Blurred vision",
    },
    {
        id: 27,
        name: "Bradycardia",
    },
    {
        id: 28,
        name: "Bradykinesia",
    },
    {
        id: 29,
        name: "breathing difficulty",
    },
    {
        id: 30,
        name: "Breathing too fast",
    },
    {
        id: 31,
        name: "Breathlessness",
    },
    {
        id: 32,
        name: "Bruises",
    },
    {
        id: 33,
        name: "Bulging oF Eyes",
    },
    {
        id: 34,
        name: "Bump near limbus",
    },
    {
        id: 35,
        name: "Burning during micturition",
    },
    {
        id: 36,
        name: "Burning micturition",
    },
    {
        id: 37,
        name: "Burning Sensation",
    },
    {
        id: 38,
        name: "Change in voice",
    },
    {
        id: 39,
        name: "Chest Discomfort",
    },
    {
        id: 40,
        name: "Chest pain",
    },
    {
        id: 41,
        name: "Coated Tongue",
    },
    {
        id: 42,
        name: "Cold",
    },
    {
        id: 43,
        name: "Cold intolerance",
    },
    {
        id: 44,
        name: "Colicky abdomen pain",
    },
    {
        id: 45,
        name: "Colour of cough",
    },
    {
        id: 46,
        name: "Coloured Halos",
    },
    {
        id: 47,
        name: "Confusion",
    },
    {
        id: 48,
        name: "Conjuctival Congestion",
    },
    {
        id: 49,
        name: "Contionous fever",
    },
    {
        id: 50,
        name: "CONSTIPATION",
    },
    {
        id: 51,
        name: "Convulsions",
    },
    {
        id: 52,
        name: "Cor pulmonale",
    },
    {
        id: 53,
        name: "Cough",
    },
    {
        id: 54,
        name: "cough with Expectoration",
    },
    {
        id: 55,
        name: "Cough without expectoration",
    },
    {
        id: 56,
        name: "Crusting",
    },
    {
        id: 57,
        name: "Curtain like shadow over visual field",
    },
    {
        id: 58,
        name: "Cyanosis",
    },
    {
        id: 59,
        name: "Dandruff",
    },
    {
        id: 60,
        name: "Dark spots in Visual Field",
    },
    {
        id: 61,
        name: "Deafness",
    },
    {
        id: 62,
        name: "Decrease urine output",
    },
    {
        id: 63,
        name: "decrease vision activity",
    },
    {
        id: 64,
        name: "Decreased Apetite",
    },
    {
        id: 65,
        name: "Decreased vision",
    },
    {
        id: 66,
        name: "Deformity",
    },
    {
        id: 67,
        name: "Delayed periods",
    },
    {
        id: 68,
        name: "Depression",
    },
    {
        id: 69,
        name: "Dermatomes",
    },
    {
        id: 70,
        name: "Developmental delay",
    },
    {
        id: 71,
        name: "Diarrhea",
    },
    {
        id: 72,
        name: "Difficulty in breathing",
    },
    {
        id: 73,
        name: "Difficulty in movement",
    },
    {
        id: 74,
        name: "Difficulty in speech language",
    },
    {
        id: 75,
        name: "Difficulty in swallowing",
    },
    {
        id: 76,
        name: "Difficulty walking",
    },
    {
        id: 77,
        name: "Dilated pupils",
    },
    {
        id: 78,
        name: "Diminution of Vision",
    },
    {
        id: 79,
        name: "Discharge",
    },
    {
        id: 80,
        name: "Discharge PV",
    },
    {
        id: 81,
        name: "Discomfort",
    },
    {
        id: 82,
        name: "Distorted Vision",
    },
    {
        id: 83,
        name: "Dizziness",
    },
    {
        id: 84,
        name: "Double vision",
    },
    {
        id: 85,
        name: "Drooping of eyelid",
    },
    {
        id: 86,
        name: "Dropping things",
    },
    {
        id: 87,
        name: "Dry cough",
    },
    {
        id: 88,
        name: "Dry eyes",
    },
    {
        id: 89,
        name: "Dry mouth",
    },
    {
        id: 90,
        name: "Dry skin",
    },
    {
        id: 91,
        name: "Dryness",
    },
    {
        id: 92,
        name: "Duration association",
    },
    {
        id: 93,
        name: "Dust pan",
    },
    {
        id: 94,
        name: "Dyspnea",
    },
    {
        id: 95,
        name: "Ear discharge",
    },
    {
        id: 96,
        name: "Easy bruising around face",
    },
    {
        id: 97,
        name: "Easy fatigability",
    },
    {
        id: 98,
        name: "Edema",
    },
    {
        id: 99,
        name: "Elevated blood pressure",
    },
    {
        id: 100,
        name: "Epistaxix",
    },
    {
        id: 101,
        name: "Erosions",
    },
    {
        id: 102,
        name: "Excess nausea",
    },
    {
        id: 103,
        name: "Excess vomiting",
    },
    {
        id: 104,
        name: "Exercise intolerance",
    },
    {
        id: 105,
        name: "Exertional Dyspnea",
    },
    {
        id: 106,
        name: "Extremely painful joints",
    },
    {
        id: 107,
        name: "Eye irritation",
    },
    {
        id: 108,
        name: "Eye fatigue",
    },
    {
        id: 109,
        name: "Eye pain",
    },
    {
        id: 110,
        name: "Eye Puffiness",
    },
    {
        id: 111,
        name: "F.B. Sensation throat",
    },
    {
        id: 112,
        name: "Facial Puffiness",
    },
    {
        id: 113,
        name: "Fall built",
    },
    {
        id: 114,
        name: "Falling",
    },
    {
        id: 115,
        name: "Family history",
    },
    {
        id: 116,
        name: "Fatigue",
    },
    {
        id: 117,
        name: "feeding difficulty",
    },
    {
        id: 118,
        name: "Fever",
    },
    {
        id: 119,
        name: "Fever >38' C",
    },
    {
        id: 120,
        name: "Fever with chills",
    },
    {
        id: 121,
        name: "Fever with Chills & Rigor",
    },
    {
        id: 122,
        name: "Fever with Rash",
    },
    {
        id: 123,
        name: "Floaters",
    },
    {
        id: 124,
        name: "Foamy urine",
    },
    {
        id: 125,
        name: "Foreign body present over cornea",
    },
    {
        id: 126,
        name: "Foreign body sensation",
    },
    {
        id: 127,
        name: "Freq. pnumonia",
    },
    {
        id: 129,
        name: "Gait disturbance",
    },
    {
        id: 130,
        name: "Grayish White Membrane",
    },
    {
        id: 131,
        name: "Grunting",
    },
    {
        id: 132,
        name: "Haemoptysis",
    },
    {
        id: 133,
        name: "Hair loss site",
    },
    {
        id: 134,
        name: "Hard Stool",
    },
    {
        id: 135,
        name: "Headache",
    },
    {
        id: 136,
        name: "Hearing loss",
    },
    {
        id: 137,
        name: "Heart burn",
    },
    {
        id: 138,
        name: "Heat intolerance",
    },
    {
        id: 139,
        name: "Heavy Menses/ bleeding",
    },
    {
        id: 140,
        name: "Hematemesis",
    },
    {
        id: 141,
        name: "Hematuria",
    },
    {
        id: 142,
        name: "Hemoptysis",
    },
    {
        id: 143,
        name: "High fever",
    },
    {
        id: 144,
        name: "Hirsutism",
    },
    {
        id: 145,
        name: "Hypertension",
    },
    {
        id: 146,
        name: "Icterus",
    },
    {
        id: 147,
        name: "Impaired behaviour",
    },
    {
        id: 148,
        name: "Impaired bladder control",
    },
    {
        id: 149,
        name: "Impaired memory",
    },
    {
        id: 150,
        name: "Impaired thinking",
    },
    {
        id: 151,
        name: "Inability to close eyes",
    },
    {
        id: 152,
        name: "Inability to take orally",
    },
    {
        id: 153,
        name: "Increase palpitations",
    },
    {
        id: 154,
        name: "Increase urine frequency",
    },
    {
        id: 155,
        name: "Increased fat around the neck",
    },
    {
        id: 156,
        name: "Increased hunger",
    },
    {
        id: 157,
        name: "Increased thirst",
    },
    {
        id: 158,
        name: "Infertility",
    },
    {
        id: 159,
        name: "Intensely Prusitis Macules",
    },
    {
        id: 160,
        name: "Intermenstrual bleeding",
    },
    {
        id: 161,
        name: "Irregular BPV",
    },
    {
        id: 162,
        name: "Irregular periods",
    },
    {
        id: 163,
        name: "Irritability",
    },
    {
        id: 164,
        name: "Irritation in throat",
    },
    {
        id: 165,
        name: "Itching",
    },
    {
        id: 166,
        name: "Itching in ear",
    },
    {
        id: 167,
        name: "Itching in nose",
    },
    {
        id: 168,
        name: "Itching over pelvis",
    },
    {
        id: 169,
        name: "Itching site",
    },
    {
        id: 170,
        name: "Itching ulcer site",
    },
    {
        id: 171,
        name: "Jaw Tenderness",
    },
    {
        id: 172,
        name: "Joint pain",
    },
    {
        id: 173,
        name: "Joint redness",
    },
    {
        id: 174,
        name: "Joint stiffness",
    },
    {
        id: 175,
        name: "Joint swelling",
    },
    {
        id: 176,
        name: "Joint tenderness",
    },
    {
        id: 177,
        name: "Lack of conciousness",
    },
    {
        id: 178,
        name: "Lack of immunization",
    },
    {
        id: 179,
        name: "Large Head",
    },
    {
        id: 180,
        name: "Larger waistline",
    },
    {
        id: 181,
        name: "Leaking PV",
    },
    {
        id: 182,
        name: "Learning Difficulty",
    },
    {
        id: 183,
        name: "lesion itching",
    },
    {
        id: 184,
        name: "Lid lag",
    },
    {
        id: 185,
        name: "Lid swelling",
    },
    {
        id: 186,
        name: "Loose stool",
    },
    {
        id: 187,
        name: "Loss of Apetite",
    },
    {
        id: 188,
        name: "Loss of conciousness",
    },
    {
        id: 189,
        name: "Loss of depth perception",
    },
    {
        id: 190,
        name: "loss of feeling in face",
    },
    {
        id: 191,
        name: "Loss of flexibility",
    },
    {
        id: 192,
        name: "Loss of smell",
    },
    {
        id: 193,
        name: "Loss of taste",
    },
    {
        id: 194,
        name: "Loss of tears",
    },
    {
        id: 195,
        name: "Loss of vision",
    },
    {
        id: 196,
        name: "Lower back pain",
    },
    {
        id: 197,
        name: "Malaise",
    },
    {
        id: 198,
        name: "Microcephaly",
    },
    {
        id: 199,
        name: "Mild dementia",
    },
    {
        id: 200,
        name: "Mild irritation",
    },
    {
        id: 201,
        name: "Mild pain",
    },
    {
        id: 202,
        name: "Missed periods",
    },
    {
        id: 203,
        name: "Missed periods > 7 months",
    },
    {
        id: 204,
        name: "Mucosal Bleed",
    },
    {
        id: 205,
        name: "Muscle ache",
    },
    {
        id: 206,
        name: "Muscle spasm",
    },
    {
        id: 207,
        name: "Muscle Weakness",
    },
    {
        id: 208,
        name: "Myalgia",
    },
    {
        id: 209,
        name: "Myxedema",
    },
    {
        id: 210,
        name: "NaiL pattern",
    },
    {
        id: 211,
        name: "Nasal discharge",
    },
    {
        id: 212,
        name: "Nasal obstruction",
    },
    {
        id: 213,
        name: "Nausea",
    },
    {
        id: 214,
        name: "Neck pain",
    },
    {
        id: 215,
        name: "Neck stiffness",
    },
    {
        id: 216,
        name: "Night itch",
    },
    {
        id: 217,
        name: "No Eye Contact",
    },
    {
        id: 218,
        name: "Noisy Breathing",
    },
    {
        id: 219,
        name: "Non passage of Stool",
    },
    {
        id: 220,
        name: "Numbness",
    },
    {
        id: 221,
        name: "Oral ulcer",
    },
    {
        id: 222,
        name: "Orthopnea",
    },
    {
        id: 223,
        name: "Pain",
    },
    {
        id: 224,
        name: "Pain and stiffness in the hips",
    },
    {
        id: 225,
        name: "Pain and stiffness in the lower back",
    },
    {
        id: 226,
        name: "Pain in ear",
    },
    {
        id: 227,
        name: "Pain in eye movement",
    },
    {
        id: 228,
        name: "Pain in limbs",
    },
    {
        id: 229,
        name: "Pain in throats",
    },
    {
        id: 230,
        name: "Pain on EOM",
    },
    {
        id: 231,
        name: "Pain ulcer site",
    },
    {
        id: 232,
        name: "Painful coitus",
    },
    {
        id: 233,
        name: "Painful menses",
    },
    {
        id: 234,
        name: "Painful micturition",
    },
    {
        id: 235,
        name: "Painless selling on lids",
    },
    {
        id: 236,
        name: "PALE",
    },
    {
        id: 237,
        name: "Palms & soles",
    },
    {
        id: 238,
        name: "Palpitations",
    },
    {
        id: 239,
        name: "Paraplegia",
    },
    {
        id: 240,
        name: "Parotitis",
    },
    {
        id: 241,
        name: "Paroxysmal nocturnal dyspnea",
    },
    {
        id: 242,
        name: "Partner",
    },
    {
        id: 243,
        name: "Pedal Edema",
    },
    {
        id: 244,
        name: "Personal fatigue",
    },
    {
        id: 245,
        name: "Petechiae",
    },
    {
        id: 246,
        name: "Periorbital puffiness",
    },
    {
        id: 247,
        name: "Photo sensitivity",
    },
    {
        id: 248,
        name: "Photophobia",
    },
    {
        id: 249,
        name: "Photopsia",
    },
    {
        id: 250,
        name: "Pleuritic pain",
    },
    {
        id: 252,
        name: "Poor weight gain",
    },
    {
        id: 253,
        name: "Postcoital bleeding",
    },
    {
        id: 254,
        name: "Production of cough because of smoking",
    },
    {
        id: 255,
        name: "Prolonged Bleed",
    },
    {
        id: 256,
        name: "Proptosis",
    },
    {
        id: 257,
        name: "Ptosis",
    },
    {
        id: 258,
        name: "Puffiness",
    },
    {
        id: 259,
        name: "Puffy eyes",
    },
    {
        id: 260,
        name: "Purpura",
    },
    {
        id: 261,
        name: "Quadriplegia",
    },
    {
        id: 262,
        name: "Rash",
    },
    {
        id: 263,
        name: "Red lesions",
    },
    {
        id: 264,
        name: "Red tender swelling on lids",
    },
    {
        id: 265,
        name: "Redness",
    },
    {
        id: 266,
        name: "Redness of eyelid",
    },
    {
        id: 267,
        name: "Refuse to feed",
    },
    {
        id: 268,
        name: "Resting tremor",
    },
    {
        id: 269,
        name: "Restlessness",
    },
    {
        id: 270,
        name: "Rigidity",
    },
    {
        id: 271,
        name: "Ropy discharge",
    },
    {
        id: 272,
        name: "Running Nose",
    },
    {
        id: 273,
        name: "Scaling",
    },
    {
        id: 274,
        name: "Scalp involvement",
    },
    {
        id: 275,
        name: "Scar",
    },
    {
        id: 276,
        name: "Seasonal variation",
    },
    {
        id: 277,
        name: "Secondary infection",
    },
    {
        id: 278,
        name: "Seizure",
    },
    {
        id: 279,
        name: "Sensitivity to light",
    },
    {
        id: 280,
        name: "Severe headache",
    },
    {
        id: 281,
        name: "Severe Itching",
    },
    {
        id: 282,
        name: "Shortness of breath",
    },
    {
        id: 283,
        name: "Shrill cry",
    },
    {
        id: 284,
        name: "Skin rash",
    },
    {
        id: 285,
        name: "Slurring of speech",
    },
    {
        id: 286,
        name: "Small yellow growth",
    },
    {
        id: 287,
        name: "Sneezing",
    },
    {
        id: 288,
        name: "SOB",
    },
    {
        id: 289,
        name: "SOB on exertion",
    },
    {
        id: 290,
        name: "Something coming out of vagina",
    },
    {
        id: 291,
        name: "Sore Throat",
    },
    {
        id: 292,
        name: "Spine deformity",
    },
    {
        id: 293,
        name: "Spine stiffness",
    },
    {
        id: 294,
        name: "Squint",
    },
    {
        id: 295,
        name: "Staring Look",
    },
    {
        id: 296,
        name: "Steroid abuse",
    },
    {
        id: 297,
        name: "Stiff neck",
    },
    {
        id: 298,
        name: "Sweating",
    },
    {
        id: 299,
        name: "Swelling",
    },
    {
        id: 300,
        name: "Swelling in muscle",
    },
    {
        id: 301,
        name: "Swollen finger & toes",
    },
    {
        id: 302,
        name: "Syneope",
    },
    {
        id: 303,
        name: "Tachypnea",
    },
    {
        id: 304,
        name: "Temperature instability",
    },
    {
        id: 305,
        name: "tender red ",
    },
    {
        id: 306,
        name: "Tenderness",
    },
    {
        id: 307,
        name: "Tinnitus",
    },
    {
        id: 308,
        name: "Tone Abnormality",
    },
    {
        id: 309,
        name: "Tracheal shift",
    },
    {
        id: 310,
        name: "Trail sign",
    },
    {
        id: 311,
        name: "Tripping",
    },
    {
        id: 312,
        name: "Trouble seeing",
    },
    {
        id: 313,
        name: "Ulcers",
    },
    {
        id: 314,
        name: "Unable to conceive",
    },
    {
        id: 315,
        name: "Urinary incontinence",
    },
    {
        id: 316,
        name: "Vertigo",
    },
    {
        id: 317,
        name: "Vomiting",
    },
    {
        id: 318,
        name: "Watering",
    },
    {
        id: 319,
        name: "Weakness",
    },
    {
        id: 320,
        name: "Weakness in face",
    },
    {
        id: 321,
        name: "Weakness of limbs",
    },
    {
        id: 322,
        name: "Weight gain",
    },
    {
        id: 323,
        name: "Weight Loss",
    },
    {
        id: 324,
        name: "Winter Aggravation",
    },
    {
        id: 325,
        name: "Young age",
    },
];

const {Option} = Select;

const children = [];

for (let each in symptoms) {
    children.push(
        <Option key={symptoms[each].name}>{symptoms[each].name}</Option>
    );
}

function CustomSymptomsEdit({
                                symptoms,
                                handleSymptomsChanges,
                                handleSymptomSelect,
                                hendleSymptomDeselect,
                            }) {
    return (
        <div className="mt10 mb10 cdss-select">
            <Select
                mode="tags"
                style={{width: "100%"}}
                onChange={handleSymptomsChanges}
                tokenSeparators={[","]}
                placeholder="Search for symptoms"
                onSelect={handleSymptomSelect}
                onDeselect={hendleSymptomDeselect}
                value={symptoms}
            >
                {children}
            </Select>
        </div>
    );
}

export default CustomSymptomsEdit;
