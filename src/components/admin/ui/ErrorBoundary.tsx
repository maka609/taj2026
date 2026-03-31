"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] p-6" dir="rtl">
          <Card className="w-full max-w-md border-rose-100 bg-rose-50/30">
            <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6 text-rose-600" />
                </div>
              <CardTitle className="text-xl font-bold text-gray-900">حدث خطأ ما</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                عذراً، حدث خطأ غير متوقع أثناء عرض هذه الصفحة. يرجى محاولة إعادة التحميل.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="w-full h-11 rounded-xl bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/20 font-bold"
              >
                <RefreshCcw className="w-4 h-4 ml-2" />
                إعادة تحميل الصفحة
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
