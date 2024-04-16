package com.anonymous.ProyectoPracticas;

import android.app.Application;
import android.content.res.Configuration;
import androidx.annotation.NonNull;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactHost;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactHost;
import com.facebook.react.flipper.ReactNativeFlipper;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;

import java.util.List;

import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost reactNativeHost = new ReactNativeHostWrapper(
    this,
    new DefaultReactNativeHost(this) {
      @Override
      protected List<ReactPackage> getPackages() {
        List<ReactPackage> packages = new PackageList(this).getPackages();
        // Agrega el paquete de Firebase
        packages.add(new ReactNativeFirebaseAppPackage());
        return packages;
      }

      @Override
      protected String getJSMainModuleName() {
        return ".expo/.virtual-metro-entry";
      }

      @Override
      protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      public boolean isNewArchEnabled() {
        return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
      }

      @Override
      public boolean isHermesEnabled() {
        return BuildConfig.IS_HERMES_ENABLED;
      }
    }
  );

  @Override
  public ReactNativeHost getReactNativeHost() {
    return reactNativeHost;
  }

  @Override
  public ReactHost getReactHost() {
    return getDefaultReactHost(getApplicationContext(), reactNativeHost);
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
    if (!BuildConfig.REACT_NATIVE_UNSTABLE_USE_RUNTIME_SCHEDULER_ALWAYS) {
      ReactFeatureFlags.unstable_useRuntimeSchedulerAlways = false;
    }
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // Si has optado por la Nueva Arquitectura, carga el punto de entrada nativo para esta app.
      DefaultNewArchitectureEntryPoint.load();
    }
    if (BuildConfig.DEBUG) {
      ReactNativeFlipper.initializeFlipper(this, reactNativeHost.getReactInstanceManager());
    }
    ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }

  @Override
  public void onConfigurationChanged(@NonNull Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  }
}
