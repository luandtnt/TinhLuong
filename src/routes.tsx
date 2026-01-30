import { createBrowserRouter, Navigate } from "react-router";
import { MainLayout } from "./components/layout/MainLayout";
import { PoliticalDocumentsPage } from "./pages/PoliticalDocumentsPage";
import { HistoricalDocumentsPage } from "./pages/documents/HistoricalDocumentsPage";
import { SubordinateHistoricalDocumentsPage } from "./pages/documents/SubordinateHistoricalDocumentsPage";
import { PartyTermDocumentsPage } from "./pages/documents/PartyTermDocumentsPage";
import { SubordinatePartyTermDocumentsPage } from "./pages/documents/SubordinatePartyTermDocumentsPage";
import { PartyCharterDocumentsPage } from "./pages/documents/PartyCharterDocumentsPage";
import { SubordinatePartyCharterDocumentsPage } from "./pages/documents/SubordinatePartyCharterDocumentsPage";
import { PoliticalBooksPage } from "./pages/documents/PoliticalBooksPage";
import { SubordinatePoliticalBooksPage } from "./pages/documents/SubordinatePoliticalBooksPage";
import { PartyDocumentsCompletePage } from "./pages/documents/PartyDocumentsCompletePage";
import { SubordinatePartyDocumentsCompletePage } from "./pages/documents/SubordinatePartyDocumentsCompletePage";
import { PartyDocumentsIntroPage } from "./pages/documents/PartyDocumentsIntroPage";
import { SubordinatePartyDocumentsIntroPage } from "./pages/documents/SubordinatePartyDocumentsIntroPage";
import { PartyCongressPage } from "./pages/documents/PartyCongressPage";
import { SubordinatePartyCongressPage } from "./pages/documents/SubordinatePartyCongressPage";
import { CentralCommitteeMeetingPage } from "./pages/documents/CentralCommitteeMeetingPage";
import { SubordinateCentralCommitteeMeetingPage } from "./pages/documents/SubordinateCentralCommitteeMeetingPage";
import { AddDocumentPage } from "./pages/documents/AddDocumentPage";
import { RoleSelectionPage } from "./pages/RoleSelectionPage";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { RoleBasedRoute } from "./components/layout/RoleBasedRoute";
import { ReviewListPage } from "./pages/reviews/ReviewListPage";
import { ReviewDetailPage } from "./pages/reviews/ReviewDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/role-selection" replace />,
  },
  {
    path: "/role-selection",
    Component: RoleSelectionPage,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <RoleBasedRoute
            supervisorComponent={<HistoricalDocumentsPage />}
            subordinateComponent={<SubordinateHistoricalDocumentsPage />}
          />
        ),
      },
      {
        path: "historical-documents",
        element: (
          <RoleBasedRoute
            supervisorComponent={<HistoricalDocumentsPage />}
            subordinateComponent={<SubordinateHistoricalDocumentsPage />}
          />
        ),
      },
      {
        path: "party-term-documents",
        element: (
          <RoleBasedRoute
            supervisorComponent={<PartyTermDocumentsPage />}
            subordinateComponent={<SubordinatePartyTermDocumentsPage />}
          />
        ),
      },
      {
        path: "party-charter-documents",
        element: (
          <RoleBasedRoute
            supervisorComponent={<PartyCharterDocumentsPage />}
            subordinateComponent={<SubordinatePartyCharterDocumentsPage />}
          />
        ),
      },
      {
        path: "political-books",
        element: (
          <RoleBasedRoute
            supervisorComponent={<PoliticalBooksPage />}
            subordinateComponent={<SubordinatePoliticalBooksPage />}
          />
        ),
      },
      {
        path: "party-documents-complete",
        element: (
          <RoleBasedRoute
            supervisorComponent={<PartyDocumentsCompletePage />}
            subordinateComponent={<SubordinatePartyDocumentsCompletePage />}
          />
        ),
      },
      {
        path: "party-documents-intro",
        element: (
          <RoleBasedRoute
            supervisorComponent={<PartyDocumentsIntroPage />}
            subordinateComponent={<SubordinatePartyDocumentsIntroPage />}
          />
        ),
      },
      {
        path: "party-congress",
        element: (
          <RoleBasedRoute
            supervisorComponent={<PartyCongressPage />}
            subordinateComponent={<SubordinatePartyCongressPage />}
          />
        ),
      },
      {
        path: "central-committee-meeting",
        element: (
          <RoleBasedRoute
            supervisorComponent={<CentralCommitteeMeetingPage />}
            subordinateComponent={<SubordinateCentralCommitteeMeetingPage />}
          />
        ),
      },
      { path: "political-documents", Component: PoliticalDocumentsPage },
      { path: "reviews", Component: ReviewListPage },
      { path: "reviews/:id", Component: ReviewDetailPage },
    ],
  },
  {
    path: "/add-document",
    element: (
      <ProtectedRoute>
        <AddDocumentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/role-selection" replace />,
  },
]);