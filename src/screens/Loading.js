import React from "react";
import LoadingModul from "../components/LoadingModul";
import backgroundImage from "../assets/7b0e5ab7-38f9-40a4-a958-6c0d9b389d79.jpeg";

function Loading () {
    return (
        <div
        style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
        }}
        className="h-screen relative"
        >
            <div
            style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                bottom: "14%",
            }}>
                <LoadingModul size={60} />
            </div>

        </div>
    );
}

export default Loading;