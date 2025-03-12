'use client';

import { useEffect } from "react";
import "react-kakao-maps-sdk";

type Location = {
    y: number;
    x: number;
}

interface KakaoMapProps {
    location: Location[];
}

const KakaoMap = ({location} : KakaoMapProps) => {

    useEffect(()=>{
    	// 1. 카카오 지도 초기화
        kakao?.maps.load(() => {
        	// 2. 지도 생성 및 설정
            const container = document.getElementById("map");

            const options = {
                center: location.length !== 0 ? new kakao.maps.LatLng(location[0]?.y, location[0]?.x) : new kakao.maps.LatLng(127.0292884713586, 37.49554428487904),
                level: 3,
            };
            
            // 맵 생성
            const map = new kakao.maps.Map(container as HTMLElement, options);
            
            const marker = new kakao.maps.Marker({
                map: map,
                position: location.length !== 0 ? new kakao.maps.LatLng(location[0]?.y, location[0]?.x) : new kakao.maps.LatLng(127.0292884713586, 37.49554428487904),
            });

            
            marker.setMap(map); 

        });
    });

    return (
        <>
            <div id="map" className="w-full  h-full" />
        </>
    )
}

export default KakaoMap;