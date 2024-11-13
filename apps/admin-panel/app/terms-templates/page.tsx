"use client"
import React, { useState } from "react"
import { gql } from "@apollo/client"
import Link from "next/link"
import { useRouter } from "next/navigation"

import DataTable, { Column } from "../data-table"

import { TermsTemplate, useTermsTemplatesQuery } from "@/lib/graphql/generated"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/primitive/card"
import { formatPeriod } from "@/lib/utils"
import { UpdateTermsTemplateDialog } from "@/components/terms-template/update-dialog"

gql`
  query TermsTemplates {
    termsTemplates {
      id
      name
      termsId
      createdAt
      subjectCanUpdateTermsTemplate
      values {
        annualRate
        accrualInterval
        incurrenceInterval
        liquidationCvl
        marginCallCvl
        initialCvl
        duration {
          period
          units
        }
      }
    }
  }
`

function TermPage() {
  const router = useRouter()
  const { data, refetch, loading, error } = useTermsTemplatesQuery()
  const [openUpdateTermsTemplateDialog, setOpenUpdateTermsTemplateDialog] =
    useState<TermsTemplate | null>(null)

  const columns: Column<TermsTemplate>[] = [
    {
      key: "name",
      header: "Name",
      render: (name, template) => (
        <div className="hover:underline">
          <Link href={`/terms-templates/${template.termsId}`}>{name}</Link>
        </div>
      ),
    },
    {
      key: "values",
      header: "Duration",
      render: (values) =>
        `${String(values.duration.units)} ${formatPeriod(values.duration.period)}`,
    },
    {
      key: "values",
      header: "Annual Rate",
      render: (values) => `${values.annualRate}%`,
    },
    {
      key: "values",
      header: "Initial CVL",
      render: (values) => `${values.initialCvl}%`,
    },
    {
      key: "values",
      header: "MarginCall CVL",
      render: (values) => `${values.marginCallCvl}%`,
    },
    {
      key: "values",
      header: "Liquidation CVL",
      render: (values) => `${values.liquidationCvl}%`,
    },
  ]

  if (error) {
    return (
      <Card>
        <CardContent>
          <p className="text-destructive mt-6">{error.message}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <main>
      {openUpdateTermsTemplateDialog && (
        <UpdateTermsTemplateDialog
          termsTemplate={openUpdateTermsTemplateDialog}
          openUpdateTermsTemplateDialog={Boolean(openUpdateTermsTemplateDialog)}
          setOpenUpdateTermsTemplateDialog={() => setOpenUpdateTermsTemplateDialog(null)}
          refetch={refetch}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle>Terms Templates</CardTitle>
          <CardDescription>
            Terms template that can be used with loan and credit facility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data?.termsTemplates || []}
            columns={columns}
            loading={loading}
            rowClassName="cursor-pointer"
            onRowClick={(template) => router.push(`/terms-templates/${template.termsId}`)}
          />
        </CardContent>
      </Card>
    </main>
  )
}

export default TermPage
