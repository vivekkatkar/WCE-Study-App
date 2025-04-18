import React, { useEffect, useState } from 'react';

const RequirementField = ({ name, label, register, errors, setValue }) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        register(name, { required: true });
    }, [register, name]);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList, name, setValue]);

    const handleAddRequirement = () => {
        if (requirement.trim()) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    };

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    };

    return (
        <div>
            <label htmlFor={name}>{label}<sup>*</sup></label>
            <div className="flex gap-2">
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="border-b-2 border-b-richblack-100 rounded-md px-2 bg-richblack-700 w-full"
                />
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="font-semibold text-yellow-50"
                >
                    Add
                </button>
            </div>

            {requirementList.length > 0 && (
                <ul>
                    {requirementList.map((req, index) => (
                        <li key={index} className="flex items-center text-richblack-5">
                            <span>{req}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveRequirement(index)}
                                className="text-xs text-pure-greys-300 ml-2"
                            >
                                clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {errors[name] && <span>{label} is required</span>}
        </div>
    );
};

export default RequirementField;
