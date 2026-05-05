"use client";

import { useEffect, useState } from "react";

type DevicePlatform = "ios" | "android" | "huawei" | "unknown";

function detectPlatform(): DevicePlatform {
  if (typeof navigator === "undefined") return "unknown";

  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() ?? "";

  // iOS: iPhone, iPad, iPod, o Mac con touch (iPad Pro en desktop mode)
  if (
    /iphone|ipod/.test(ua) ||
    (/ipad/.test(ua) || (platform === "macintel" && "maxTouchPoints" in navigator && navigator.maxTouchPoints > 1))
  ) {
    return "ios";
  }

  // Huawei / HarmonyOS
  if (/huawei|harmonyos/.test(ua)) {
    return "huawei";
  }

  // Android
  if (/android/.test(ua)) {
    return "android";
  }

  return "unknown";
}

export function useDevicePlatform() {
  const [platform, setPlatform] = useState<DevicePlatform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  return platform;
}
